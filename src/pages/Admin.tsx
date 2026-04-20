import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut, User, Mail, Phone, Calendar, MessageSquare, Tag, Trash2, AlertTriangle, Info,
  Building, Users, Briefcase, FileText
} from "lucide-react";
import { urlBack } from "@/hooks/url_enpoint";

const PROSPECTOS_ENDPOINT = `${urlBack}/prospectos.php`;      // GET (listar) y POST (registro)
const ELIMINAR_ENDPOINT = `${urlBack}/eliminar_prospecto.php`; // DELETE ?id=

interface Prospecto {
  id: number;
  nombreCompleto: string;
  correoElectronico: string;
  telefono: string;
  mensaje: string | null;
  serviciosSolicitados: string[] | null; // array de strings o null
  tipoProspecto: "general" | "empresa" | "proveedor";
  fecha_creacion: string;
}

type TipoFiltro = "todos" | "general" | "empresa" | "proveedor";

const AdminProspectos = () => {
  const [prospectos, setProspectos] = useState<Prospecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<TipoFiltro>("todos");

  // Modal de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [prospectoToDelete, setProspectoToDelete] = useState<{ id: number; nombre: string } | null>(null);

  // Modal de alerta genérico
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
    fetchProspectos();
  }, [token, navigate]);

  const fetchProspectos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(PROSPECTOS_ENDPOINT, {
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
      console.log(data)
      setProspectos(data)
      // Asegurar que serviciosSolicitados sea un array si viene como string JSON
      // const normalized = data.map((p: any) => ({
      //   ...p,
      //   serviciosSolicitados: p.serviciosSolicitados ? JSON.parse(p.serviciosSolicitados) : null,
      // }));
      // console.log(data)
      // setProspectos(normalized);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudo cargar la lista de prospectos.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const confirmDelete = (id: number, nombre: string) => {
    setProspectoToDelete({ id, nombre });
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!prospectoToDelete) return;
    const { id, nombre } = prospectoToDelete;
    try {
      const response = await fetch(`${ELIMINAR_ENDPOINT}?id=${id}`, {
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
        throw new Error(errorData.error || "Error al eliminar el prospecto");
      }

      // Actualizar estado local
      setProspectos((prev) => prev.filter((p) => p.id !== id));
      showAlert("Prospecto eliminado correctamente", "Éxito");
    } catch (err: any) {
      console.error(err);
      showAlert(err.message || "No se pudo eliminar el prospecto", "Error");
    } finally {
      setShowDeleteModal(false);
      setProspectoToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProspectoToDelete(null);
  };

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

  // Filtrar prospectos según la pestaña activa
  const prospectosFiltrados = filtro === "todos"
    ? prospectos
    : prospectos.filter((p) => p.tipoProspecto === filtro);

  // Contadores para las pestañas
  const counts = {
    todos: prospectos.length,
    general: prospectos.filter((p) => p.tipoProspecto === "general").length,
    empresa: prospectos.filter((p) => p.tipoProspecto === "empresa").length,
    proveedor: prospectos.filter((p) => p.tipoProspecto === "proveedor").length,
  };

  // Helper para mostrar servicios como string
  const formatServicios = (servicios: string[] | null) => {
    if (!servicios || servicios.length === 0) return "—";
    const map: Record<string, string> = {
      atencionmedica: "Atención médica",
      ambulancias: "Ambulancias y urgencias",
      farmacia: "Farmacia",
      rehabilitacion: "Rehabilitación",
      enfermeria: "Enfermería",
      oxigeno: "Oxígeno y ventilación",
      equipo: "Equipo médico y material de curación",
    };
    return servicios.map(s => map[s] || s).join(", ");
  };

  // Helper para icono según tipo
  const TipoIcon = ({ tipo }: { tipo: string }) => {
    switch (tipo) {
      case "general": return <User className="w-4 h-4" />;
      case "empresa": return <Building className="w-4 h-4" />;
      case "proveedor": return <Briefcase className="w-4 h-4" />;
      default: return <Tag className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-heading text-lg font-bold text-foreground">Panel Administrativo</h1>
              <p className="text-muted-foreground text-xs font-body">Gestión de prospectos</p>
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
        {/* Tarjeta de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="text-muted-foreground text-sm font-body">Total prospectos</div>
            <div className="text-3xl font-heading font-black text-foreground">{counts.todos}</div>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="text-muted-foreground text-sm font-body flex items-center gap-2"><User className="w-4 h-4" /> Generales</div>
            <div className="text-3xl font-heading font-black text-foreground">{counts.general}</div>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="text-muted-foreground text-sm font-body flex items-center gap-2"><Building className="w-4 h-4" /> Empresas</div>
            <div className="text-3xl font-heading font-black text-foreground">{counts.empresa}</div>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="text-muted-foreground text-sm font-body flex items-center gap-2"><Briefcase className="w-4 h-4" /> Proveedores</div>
            <div className="text-3xl font-heading font-black text-foreground">{counts.proveedor}</div>
          </div>
        </div>

        {/* Pestañas (tabs) */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-2">
          {(["todos", "general", "empresa", "proveedor"] as const).map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltro(tipo)}
              className={`px-4 py-2 rounded-t-lg font-heading text-sm font-semibold transition-colors flex items-center gap-2
                ${filtro === tipo
                  ? "bg-primary text-primary-foreground border-b-2 border-primary"
                  : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
            >
              {tipo === "todos" && <FileText className="w-4 h-4" />}
              {tipo === "general" && <User className="w-4 h-4" />}
              {tipo === "empresa" && <Building className="w-4 h-4" />}
              {tipo === "proveedor" && <Briefcase className="w-4 h-4" />}
              {tipo === "todos" ? "Todos" : tipo === "general" ? "Generales" : tipo === "empresa" ? "Empresas" : "Proveedores"}
              <span className="ml-1 text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">
                {counts[tipo]}
              </span>
            </button>
          ))}
        </div>

        {/* Contenido principal */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground font-body mt-4">Cargando prospectos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-destructive/30 mx-auto mb-4" />
            <p className="text-destructive font-body">{error}</p>
            <button onClick={() => fetchProspectos()} className="mt-4 text-primary hover:underline">
              Reintentar
            </button>
          </div>
        ) : prospectosFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-body">No hay prospectos de este tipo.</p>
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
                    <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Mensaje</th>
                    <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Servicios</th>
                    <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Tipo</th>
                    <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Fecha</th>
                    {/* <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Acciones</th> */}
                  </tr>
                </thead>
                <tbody>
                  {prospectosFiltrados.map((prospecto, i) => (
                    <motion.tr
                      key={prospecto.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-body text-sm text-foreground">{prospecto.nombreCompleto}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="font-body text-sm text-foreground">{prospecto.correoElectronico}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="font-body text-sm text-foreground">{prospecto.telefono}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 max-w-xs">
                          <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="font-body text-sm text-muted-foreground truncate" title={prospecto.mensaje || ""}>
                            {prospecto.mensaje || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 max-w-xs">
                          <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="font-body text-sm text-muted-foreground truncate" title={formatServicios(prospecto.serviciosSolicitados)}>
                            {formatServicios(prospecto.serviciosSolicitados)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <TipoIcon tipo={prospecto.tipoProspecto} />
                          <span className="font-body text-sm capitalize">{prospecto.tipoProspecto}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-body text-sm text-muted-foreground">
                            {new Date(prospecto.fecha_creacion).toLocaleDateString("es-MX")}
                          </span>
                        </div>
                       </td>
                      {/* <td className="px-6 py-4">
                        <button
                          onClick={() => confirmDelete(prospecto.id, prospecto.nombreCompleto)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          title="Eliminar prospecto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                       </td> */}
                    </motion.tr>
                  ))}
                </tbody>
               </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && prospectoToDelete && (
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
                ¿Estás seguro de que deseas eliminar permanentemente el prospecto de{" "}
                <span className="font-semibold text-foreground">"{prospectoToDelete.nombre}"</span>?
                Esta acción no se puede deshacer.
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

      {/* Modal de alerta genérico */}
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
              <p className="text-muted-foreground font-body mb-6">{alertMessage}</p>
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
    </div>
  );
};

export default AdminProspectos;