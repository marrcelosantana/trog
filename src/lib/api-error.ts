import type { AxiosError } from "axios";

const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: "Requisição inválida",
  401: "Não autorizado. Faça login novamente.",
  403: "Acesso negado",
  404: "Recurso não encontrado",
  408: "A requisição expirou",
  429: "Muitas requisições. Tente novamente mais tarde.",
  500: "Erro interno do servidor",
  502: "Serviço temporariamente indisponível",
  503: "Serviço temporariamente indisponível",
};

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError)?.isAxiosError === true;
}

/**
 * Extrai uma mensagem amigável de erro a partir de um erro de requisição.
 */
export function getErrorMessage(error: unknown): string {
  if (!error) return "Ocorreu um erro inesperado";

  if (isAxiosError(error)) {
    if (error.code === "ERR_NETWORK") {
      return "Erro de conexão. Verifique sua internet.";
    }
    if (error.code === "ECONNABORTED") {
      return "A requisição demorou muito. Tente novamente.";
    }

    const status = error.response?.status;
    if (status && HTTP_ERROR_MESSAGES[status]) {
      return HTTP_ERROR_MESSAGES[status];
    }

    const apiMessage = (error.response?.data as { message?: string })?.message;
    if (typeof apiMessage === "string" && apiMessage.trim()) return apiMessage;
  }

  if (error instanceof Error) {
    return error.message || "Ocorreu um erro inesperado";
  }

  return "Ocorreu um erro inesperado";
}
