import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, FileText, Mail, Phone, User, Calendar, Eye, X, Download, Trash2, AlertTriangle, Info } from "lucide-react";
import logoEnergia from "@/assets/logo-energiapuramx.jpg";
import { urlBack } from "@/hooks/url_enpoint";

const CLIENTES_ENDPOINT = `${urlBack}/clientes.php`;
const URL_ENPOINT = `${urlBack}`;

interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  url_comprobante: string;
  fecha_registro: string;
}

const Admin = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  
  // Estados para el modal de confirmación de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<{ id: number; nombre: string } | null>(null);
  
  // Estados para el modal de alerta genérico
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("Aviso");
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchClientes();
  }, [token, navigate]);

  const fetchClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(CLIENTES_ENDPOINT, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      const data = await response.json();
      setClientes(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudo cargar la lista de solicitudes.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getFullPdfUrl = (url: string) => {
    if (url.startsWith("http")) return url;
    const base = urlBack.endsWith("/") ? urlBack.slice(0, -1) : urlBack;
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${base}${path}`;
  };

  const handleViewPdf = async (relativeUrl: string) => {
    if (!token) return;
    setPdfLoading(true);
    try {
      const fullUrl = getFullPdfUrl(relativeUrl);
      const response = await fetch(fullUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`No se pudo cargar el PDF (${response.status})`);

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setPdfBlobUrl(blobUrl);
    } catch (error) {
      console.error(error);
      showAlert("Error al cargar el comprobante. Inténtalo de nuevo.", "Error");
    } finally {
      setPdfLoading(false);
    }
  };

  const closePdfModal = () => {
    if (pdfBlobUrl) {
      URL.revokeObjectURL(pdfBlobUrl);
      setPdfBlobUrl(null);
    }
  };

  const handleDownloadPdf = async (urlOrBlob: string, nombreCliente: string) => {
    try {
      let blob: Blob;
      if (urlOrBlob.startsWith("blob:")) {
        const response = await fetch(urlOrBlob);
        blob = await response.blob();
      } else {
        const fullUrl = getFullPdfUrl(urlOrBlob);
        const response = await fetch(fullUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Error al descargar");
        blob = await response.blob();
      }
      const link = document.createElement("a");
      const blobUrl = URL.createObjectURL(blob);
      link.href = blobUrl;
      link.download = `comprobante_${nombreCliente.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(error);
      showAlert("No se pudo descargar el comprobante.", "Error de descarga");
    }
  };

  // Abre el modal de confirmación antes de eliminar
  const confirmDelete = (id: number, nombre: string) => {
    setClienteToDelete({ id, nombre });
    setShowDeleteModal(true);
  };

  // Ejecuta la eliminación real
  const handleDelete = async () => {
    if (!clienteToDelete) return;
    const { id, nombre } = clienteToDelete;
    console.log(token)
    try {
      const response = await fetch(`${URL_ENPOINT}eliminar_cliente.php?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar el cliente");
      }

      // Eliminar localmente del estado
      setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
    } catch (err: any) {
      console.error(err);
      showAlert(err.message || "No se pudo eliminar el cliente", "Error");
    } finally {
      setShowDeleteModal(false);
      setClienteToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setClienteToDelete(null);
  };

  // Función auxiliar para mostrar alertas modales
  const showAlert = (message: string, title = "Aviso") => {
    setAlertMessage(message);
    setAlertTitle(title);
    setShowAlertModal(true);
  };

  const closeAlertModal = () => {
    setShowAlertModal(false);
    setAlertMessage("");
    setAlertTitle("Aviso");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <img src={logoEnergia} alt="Energía PURAmx" className="h-10 w-auto" /> */}
            <div>
              <h1 className="font-heading text-lg font-bold text-foreground">Panel Admin</h1>
              <p className="text-muted-foreground text-xs font-body">Solicitudes recibidas</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors font-heading text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="text-muted-foreground text-sm font-body">Total solicitudes</div>
            <div className="text-3xl font-heading font-black text-foreground">{clientes.length}</div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground font-body mt-4">Cargando solicitudes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-destructive/30 mx-auto mb-4" />
            <p className="text-destructive font-body">{error}</p>
            <button onClick={() => fetchClientes()} className="mt-4 text-primary hover:underline">
              Reintentar
            </button>
          </div>
        ) : clientes.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-body">No hay solicitudes aún.</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Nombre</th>
                    <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Correo</th>
                    <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Teléfono</th>
                    <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Fecha</th>
                    <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Comprobante</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente, i) => (
                    <motion.tr
                      key={cliente.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-body text-sm text-foreground">{cliente.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="font-body text-sm text-foreground">{cliente.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="font-body text-sm text-foreground">{cliente.telefono}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-body text-sm text-muted-foreground">
                            {new Date(cliente.fecha_registro).toLocaleDateString("es-MX")}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewPdf(cliente.url_comprobante)}
                            className="flex items-center gap-1 text-primary hover:text-primary/80 font-heading text-sm font-semibold transition-colors"
                            title="Ver PDF"
                          >
                            <Eye className="w-4 h-4" />
                            Ver
                          </button>
                          <button
                            onClick={() => handleDownloadPdf(cliente.url_comprobante, cliente.nombre)}
                            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                            title="Descargar PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => confirmDelete(cliente.id, cliente.nombre)}
                            className="flex items-center gap-1 text-muted-foreground hover:text-destructive transition-colors"
                            title="Eliminar cliente"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmación para eliminar (igual que antes) */}
      {showDeleteModal && clienteToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card rounded-2xl shadow-xl max-w-md w-full border border-border overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground">Confirmar eliminación</h3>
              </div>
              <p className="text-muted-foreground font-body mb-6">
                ¿Estás seguro de que deseas eliminar permanentemente a <span className="font-semibold text-foreground">"{clienteToDelete.nombre}"</span> y su comprobante? Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors font-body text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors font-body text-sm flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Nuevo modal de alerta genérico (reemplaza los alerts nativos) */}
      {showAlertModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card rounded-2xl shadow-xl max-w-md w-full border border-border overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground">{alertTitle}</h3>
              </div>
              <p className="text-muted-foreground font-body mb-6">
                {alertMessage}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={closeAlertModal}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-body text-sm"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal PDF (sin cambios) */}
      {pdfBlobUrl && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-heading font-bold text-foreground">Comprobante de luz</h3>
              <button
                onClick={closePdfModal}
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-destructive/10 transition-colors"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>
            <div className="flex-1 p-4">
              {pdfLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
                </div>
              ) : (
                <object data={pdfBlobUrl} type="application/pdf" className="w-full h-full">
                  <p>
                    Tu navegador no puede mostrar el PDF.{" "}
                    <a href={pdfBlobUrl} download>
                      Descárgalo aquí
                    </a>
                  </p>
                </object>
              )}
            </div>
            <div className="p-4 border-t border-border flex justify-end">
              <button
                onClick={() => handleDownloadPdf(pdfBlobUrl, "documento")}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
              >
                <Download className="w-4 h-4" />
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;