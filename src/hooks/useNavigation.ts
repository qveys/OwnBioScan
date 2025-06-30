import { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface UseNavigationOptions {
  confirmBeforeLeave?: boolean;
  confirmMessage?: string;
}

export const useNavigation = (options: UseNavigationOptions = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    confirmBeforeLeave = false,
    confirmMessage = 'Êtes-vous sûr de vouloir quitter ? Vos données non sauvegardées seront perdues.'
  } = options;

  // Gestion du bouton retour du navigateur
  useEffect(() => {
    if (!confirmBeforeLeave) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = confirmMessage;
      return confirmMessage;
    };

    const handlePopState = (e: PopStateEvent) => {
      if (confirmBeforeLeave) {
        const shouldLeave = window.confirm(confirmMessage);
        if (!shouldLeave) {
          e.preventDefault();
          window.history.pushState(null, '', location.pathname);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    // Ajouter un état à l'historique pour détecter le retour
    window.history.pushState(null, '', location.pathname);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [confirmBeforeLeave, confirmMessage, location.pathname]);

  const navigateWithConfirm = useCallback((path: string) => {
    if (confirmBeforeLeave) {
      const shouldLeave = window.confirm(confirmMessage);
      if (shouldLeave) {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  }, [navigate, confirmBeforeLeave, confirmMessage]);

  const goBack = useCallback(() => {
    if (confirmBeforeLeave) {
      const shouldLeave = window.confirm(confirmMessage);
      if (shouldLeave) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  }, [navigate, confirmBeforeLeave, confirmMessage]);

  return {
    navigate: navigateWithConfirm,
    goBack,
    location
  };
};

export default useNavigation;