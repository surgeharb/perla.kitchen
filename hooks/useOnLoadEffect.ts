import { useEffect, useRef } from 'react';

/**
 * useOnLoadEffect hook to run an effect only once when the component mounts and the loaded prop is true
 * @param effect - the effect to run
 * @param loaded - the loaded prop
 * @returns void
 */
export const useOnLoadEffect = (effect: React.EffectCallback, loaded?: boolean) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    if (!hasRun.current) {
      hasRun.current = true;
      return effect();
    }
  }, [effect, loaded]);
};
