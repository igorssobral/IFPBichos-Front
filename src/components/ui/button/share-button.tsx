/* eslint-disable no-empty */
export const handleShare = async (callback: (sharedUrl: string) => void) => {
  try {
    const shareData = {
      title: document.title,
      text: 'Confira esta página',
      url: window.location.href,
    };

    // Chama a função de retorno de chamada com o link compartilhado
    if (typeof callback === 'function') {
      callback(shareData.url);
    }
  } catch (error) {
  }
};

export const handleShareSocial = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: document.title,
        text: 'Confira esta página',
        url: window.location.href,
      });
    } else {
      throw new Error('API de compartilhamento não suportada.');
    }
  } catch (error) {
  }
};
