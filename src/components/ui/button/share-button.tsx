export const handleShare = async (callback: (sharedUrl: string) => void) => {
  try {
    const shareData = {
      title: document.title,
      text: "Confira esta página",
      url: window.location.href,
    };

    // Chama a função de retorno de chamada com o link compartilhado
    if (typeof callback === "function") {
      callback(shareData.url);
    }
  } catch (error) {
    console.error("Erro ao compartilhar:", error);
    // Trate o erro de forma adequada, por exemplo, exibindo uma mensagem para o usuário.
  }
};

export const handleShareSocial = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: document.title,
        text: 'Confira esta página',
        url: window.location.href
      });
    } else {
      throw new Error('API de compartilhamento não suportada.');
    }
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
  }
};
