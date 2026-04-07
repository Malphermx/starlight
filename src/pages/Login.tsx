import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, LogIn } from "lucide-react";
import logoEnergia from "@/assets/logo-energiapuramx.jpg";
import { urlBack } from "@/hooks/url_enpoint"; // Sin extensión .js

// Tipos
interface LoginData {
  usuario: string;
  clave: string;
}

interface LoginResponse {
  data?: {
    conectado: boolean;
    token: string;
    id: string;
  };
  error?: string;
}

const enviarData = async (url: string, data: LoginData): Promise<LoginResponse> => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.error || "Error en la solicitud");
    }

    return await resp.json();
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Error de conexión" };
  }
};

const Login = () => {
  const [state, setState] = useState({
    usuario: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [espera, setEspera] = useState(false);
  const navigate = useNavigate();

  // Redirección si ya hay token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  // Limpiar error después de 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!state.usuario || !state.password) {
      setError("Favor de ingresar los datos.");
      return;
    }

    setEspera(true);

    const data: LoginData = {
      usuario: state.usuario,
      clave: state.password,
    };

    const respJson = await enviarData(`${urlBack}login.php`, data);

    if (respJson.data?.conectado) {
      localStorage.setItem("token", respJson.data.token);
      localStorage.setItem("id", respJson.data.id);
      navigate("/admin");
    } else {
      setError(respJson.error || "Credenciales incorrectas");
    }

    setEspera(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-card rounded-2xl p-8 border border-border shadow-card-hover"
      >
        <div className="text-center mb-8">
          {/* <img
            src={logoEnergia}
            alt="Energía PURAmx"
            className="h-16 w-auto mx-auto mb-4"
          /> */}
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Panel Administrativo
          </h1>
          <p className="text-muted-foreground text-sm font-body mt-1">
            Ingresa tus credenciales
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-heading font-semibold text-foreground mb-2">
              Usuario 
            </label>
            <input
              type="text"
              value={state.usuario}
              onChange={(e) =>
                setState({ ...state, usuario: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground font-body focus:ring-2 focus:ring-ring outline-none transition"
              placeholder="usuario"
              required
              disabled={espera}
            />
          </div>
          <div>
            <label className="block text-sm font-heading font-semibold text-foreground mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={state.password}
              onChange={(e) =>
                setState({ ...state, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground font-body focus:ring-2 focus:ring-ring outline-none transition"
              placeholder="••••••••"
              required
              disabled={espera}
            />
          </div>

          {error && <p className="text-destructive text-sm font-body">{error}</p>}

          <button
            type="submit"
            disabled={espera}
            className="w-full bg-gradient-solar text-primary-foreground font-heading font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {espera ? (
              "Verificando..."
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Iniciar sesión
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;