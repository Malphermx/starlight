import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut, User, Mail, Phone, Calendar, MessageSquare, Tag, Trash2, AlertTriangle, Info,
  Building, Users, Briefcase, FileText, Eye, BriefcaseBusiness, Link as LinkIcon
} from "lucide-react";
import { urlBack } from "@/hooks/url_enpoint";

// Endpoints para prospectos
const PROSPECTOS_ENDPOINT = `${urlBack}prospectos.php`;
const ELIMINAR_PROSPECTO_ENDPOINT = `${urlBack}eliminar_prospecto.php`;

// Endpoints para bolsa de trabajo (candidatos)
const CANDIDATOS_ENDPOINT = `${urlBack}bolsa.php`;     // GET y DELETE (con /{id})

interface Prospecto {
  id: number;
  nombreCompleto: string;
  correoElectronico: string;
  telefono: string;
  mensaje: string | null;
  serviciosSolicitados: string[] | null;
  tipoProspecto: "general" | "empresa" | "proveedor";
  fecha_creacion: string;
}

interface Candidato {
  id: number;
  nombre_candidato: string;
  asunto: string;
  url_cv: string;
  fecha_registro: string;
}

type TipoFiltro = "todos" | "general" | "empresa" | "proveedor";
type ActiveTab = "prospectos" | "candidatos";

const AdminProspectos = () => {
  // Estados para prospectos
  const [prospectos, setProspectos] = useState<Prospecto[]>([]);
  const [loadingProspectos, setLoadingProspectos] = useState(true);
  const [errorProspectos, setErrorProspectos] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<TipoFiltro>("todos");

  // Estados para candidatos (bolsa de trabajo)
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [loadingCandidatos, setLoadingCandidatos] = useState(true);
  const [errorCandidatos, setErrorCandidatos] = useState<string | null>(null);

  // Estado para pestaña activa
  const [activeTab, setActiveTab] = useState<ActiveTab>("prospectos");

  // Modal de eliminación (reutilizable)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: number; nombre: string; tipo: "prospecto" | "candidato" } | null>(null);

  // Modal de alerta genérico
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("Aviso");

  // Modal de detalles (solo para prospectos)
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProspecto, setSelectedProspecto] = useState<Prospecto | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ===============================
  // 1. Efecto inicial y autenticación
  // ===============================
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProspectos();
    fetchCandidatos();
  }, [token, navigate]);

  // ===============================
  // 2. Funciones para PROSPECTOS
  // ===============================
  const normalizeProspecto = (raw: any): Prospecto => {
    let servicios = raw.serviciosSolicitados;
    if (typeof servicios === "string") {
      try {
        servicios = JSON.parse(servicios);
      } catch {
        servicios = null;
      }
    }
    return {
      ...raw,
      serviciosSolicitados: Array.isArray(servicios) ? servicios : null,
    };
  };

  const fetchProspectos = async () => {
    setLoadingProspectos(true);
    setErrorProspectos(null);
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
      const normalized = data.map(normalizeProspecto);
      setProspectos(normalized);
    } catch (err: any) {
      console.error(err);
      setErrorProspectos(err.message || "No se pudo cargar la lista de prospectos.");
    } finally {
      setLoadingProspectos(false);
    }
  };

  // ===============================
  // 3. Funciones para CANDIDATOS (bolsa de trabajo)
  // ===============================
  const fetchCandidatos = async () => {
    setLoadingCandidatos(true);
    setErrorCandidatos(null);
    try {
      const response = await fetch(CANDIDATOS_ENDPOINT, {
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
      setCandidatos(data);
    } catch (err: any) {
      console.error(err);
      setErrorCandidatos(err.message || "No se pudo cargar la lista de candidatos.");
    } finally {
      setLoadingCandidatos(false);
    }
  };

  const deleteCandidato = async (id: number) => {
    try {
      const response = await fetch(`${CANDIDATOS_ENDPOINT}?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar el candidato");
      }

      // Actualizar lista local
      setCandidatos((prev) => prev.filter((c) => c.id !== id));
      showAlert("Candidato eliminado correctamente", "Éxito");
    } catch (err: any) {
      console.error(err);
      showAlert(err.message || "No se pudo eliminar el candidato", "Error");
    }
  };

  // ===============================
  // 4. Funciones compartidas (eliminación, alertas, etc.)
  // ===============================
  const confirmDelete = (id: number, nombre: string, tipo: "prospecto" | "candidato") => {
    setItemToDelete({ id, nombre, tipo });
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    const { id, nombre, tipo } = itemToDelete;

    if (tipo === "prospecto") {
      // Eliminar prospecto
      try {
        const response = await fetch(`${ELIMINAR_PROSPECTO_ENDPOINT}?id=${id}`, {
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

        setProspectos((prev) => prev.filter((p) => p.id !== id));
        showAlert("Prospecto eliminado correctamente", "Éxito");
      } catch (err: any) {
        console.error(err);
        showAlert(err.message || "No se pudo eliminar el prospecto", "Error");
      }
    } else {
      // Eliminar candidato
      await deleteCandidato(id);
    }

    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
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

  const openDetailModal = (prospecto: Prospecto) => {
    setSelectedProspecto(prospecto);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedProspecto(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ===============================
  // 5. Datos derivados para prospectos
  // ===============================
  const prospectosFiltrados = filtro === "todos"
    ? prospectos
    : prospectos.filter((p) => p.tipoProspecto === filtro);

  const counts = {
    todos: prospectos.length,
    general: prospectos.filter((p) => p.tipoProspecto === "general").length,
    empresa: prospectos.filter((p) => p.tipoProspecto === "empresa").length,
    proveedor: prospectos.filter((p) => p.tipoProspecto === "proveedor").length,
  };

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

  const TipoIcon = ({ tipo }: { tipo: string }) => {
    switch (tipo) {
      case "general": return <User className="w-4 h-4" />;
      case "empresa": return <Building className="w-4 h-4" />;
      case "proveedor": return <Briefcase className="w-4 h-4" />;
      default: return <Tag className="w-4 h-4" />;
    }
  };

  // ===============================
  // 6. Renderizado principal
  // ===============================
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-lg font-bold text-foreground">Panel Administrativo</h1>
            <p className="text-muted-foreground text-xs font-body">Gestión de prospectos y bolsa de trabajo</p>
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
        {/* Pestañas principales */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("prospectos")}
            className={`px-5 py-2.5 rounded-t-lg font-heading text-sm font-semibold transition-colors flex items-center gap-2
              ${activeTab === "prospectos"
                ? "bg-primary text-primary-foreground border-b-2 border-primary"
                : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
          >
            <Users className="w-4 h-4" />
            Prospectos
            <span className="ml-1 text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">{prospectos.length}</span>
          </button>
          <button
            onClick={() => setActiveTab("candidatos")}
            className={`px-5 py-2.5 rounded-t-lg font-heading text-sm font-semibold transition-colors flex items-center gap-2
              ${activeTab === "candidatos"
                ? "bg-primary text-primary-foreground border-b-2 border-primary"
                : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
          >
            <BriefcaseBusiness className="w-4 h-4" />
            Bolsa de trabajo
            <span className="ml-1 text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">{candidatos.length}</span>
          </button>
        </div>

        {/* SECCIÓN PROSPECTOS */}
        {activeTab === "prospectos" && (
          <>
            {/* Tarjetas de resumen */}
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

            {/* Filtros por tipo */}
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

            {/* Tabla de prospectos */}
            {loadingProspectos ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
                <p className="text-muted-foreground font-body mt-4">Cargando prospectos...</p>
              </div>
            ) : errorProspectos ? (
              <div className="text-center py-20">
                <FileText className="w-16 h-16 text-destructive/30 mx-auto mb-4" />
                <p className="text-destructive font-body">{errorProspectos}</p>
                <button onClick={fetchProspectos} className="mt-4 text-primary hover:underline">Reintentar</button>
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
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => openDetailModal(prospecto)}>
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
                              onClick={() => confirmDelete(prospecto.id, prospecto.nombreCompleto, "prospecto")}
                              className="text-destructive hover:text-destructive/80 transition-colors"
                              title="Eliminar prospecto"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                           </td> */}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* SECCIÓN CANDIDATOS (BOLSA DE TRABAJO) */}
        {activeTab === "candidatos" && (
          <>
            {loadingCandidatos ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
                <p className="text-muted-foreground font-body mt-4">Cargando candidatos...</p>
              </div>
            ) : errorCandidatos ? (
              <div className="text-center py-20">
                <BriefcaseBusiness className="w-16 h-16 text-destructive/30 mx-auto mb-4" />
                <p className="text-destructive font-body">{errorCandidatos}</p>
                <button onClick={fetchCandidatos} className="mt-4 text-primary hover:underline">Reintentar</button>
              </div>
            ) : candidatos.length === 0 ? (
              <div className="text-center py-20">
                <BriefcaseBusiness className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-body">No hay candidatos registrados en la bolsa de trabajo.</p>
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">ID</th>
                        <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Nombre</th>
                        <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Asunto</th>
                        <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">CV (URL)</th>
                        <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Fecha registro</th>
                        <th className="text-left px-6 py-4 font-heading text-sm font-semibold text-foreground">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidatos.map((candidato, i) => (
                        <motion.tr
                          key={candidato.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                        >
                          <td className="px-6 py-4 font-body text-sm text-foreground">{candidato.id}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="font-body text-sm text-foreground">{candidato.nombre_candidato}</span>
                            </div>
                           </td>
                          <td className="px-6 py-4 font-body text-sm text-foreground">{candidato.asunto}</td>
                          <td className="px-6 py-4">
                            <a
                              href={candidato.url_cv}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-primary hover:underline font-body text-sm"
                            >
                              <LinkIcon className="w-4 h-4" />
                              Ver CV
                            </a>
                           </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="font-body text-sm text-muted-foreground">
                                {new Date(candidato.fecha_registro).toLocaleDateString("es-MX")}
                              </span>
                            </div>
                           </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => confirmDelete(candidato.id, candidato.nombre_candidato, "candidato")}
                              className="text-destructive hover:text-destructive/80 transition-colors"
                              title="Eliminar candidato"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                           </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de detalles del prospecto (sin cambios) */}
      {showDetailModal && selectedProspecto && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card rounded-2xl shadow-xl max-w-2xl w-full border border-border overflow-hidden"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Detalles completos
                </h3>
                <button onClick={closeDetailModal} className="text-muted-foreground hover:text-foreground">
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase font-semibold">Nombre completo</label>
                    <p className="text-foreground font-body">{selectedProspecto.nombreCompleto}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase font-semibold">Correo electrónico</label>
                    <p className="text-foreground font-body">{selectedProspecto.correoElectronico}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase font-semibold">Teléfono</label>
                    <p className="text-foreground font-body">{selectedProspecto.telefono}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase font-semibold">Tipo de prospecto</label>
                    <p className="text-foreground font-body capitalize">{selectedProspecto.tipoProspecto}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase font-semibold">Fecha de registro</label>
                    <p className="text-foreground font-body">
                      {new Date(selectedProspecto.fecha_creacion).toLocaleString("es-MX")}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase font-semibold">Mensaje</label>
                  <p className="text-foreground font-body bg-muted/30 p-3 rounded-lg mt-1 whitespace-pre-wrap" style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {selectedProspecto.mensaje || "—"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase font-semibold">Servicios solicitados</label>
                  <div className="bg-muted/30 p-3 rounded-lg mt-1">
                    {selectedProspecto.serviciosSolicitados && selectedProspecto.serviciosSolicitados.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {selectedProspecto.serviciosSolicitados.map((serv, idx) => (
                          <li key={idx} className="text-foreground font-body">
                            {formatServicios([serv])}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">—</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeDetailModal}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-body text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de confirmación de eliminación (reutilizable) */}
      {showDeleteModal && itemToDelete && (
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
                ¿Estás seguro de que deseas eliminar permanentemente {itemToDelete.tipo === "prospecto" ? "el prospecto" : "el candidato"} de{" "}
                <span className="font-semibold text-foreground">"{itemToDelete.nombre}"</span>?
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