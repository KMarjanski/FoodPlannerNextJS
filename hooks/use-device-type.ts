import * as React from 'react';

export function useDeviceType() {
  const [device, setDevice] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  React.useEffect(() => {
    function updateDeviceType() {
      const width = window.innerWidth;
      if (width <= 600) {
        setDevice('mobile');
      } else if (width <= 1180) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    }
    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  return device;
}
