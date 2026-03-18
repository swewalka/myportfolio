export type CompatFeature = 'landingSvgFilterReference';

interface CompatFeatureSpec {
  check: () => boolean;
  shouldWorkaround?: (isSupported: boolean) => boolean;
}

const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';

const isFirefox = (): boolean => {
  if (!isClient) return false;
  const { userAgent } = window.navigator;
  return /firefox/i.test(userAgent) && !/seamonkey/i.test(userAgent);
};

const supportsCssFilters = (): boolean => {
  if (!isClient || typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return false;
  }

  return CSS.supports('filter', 'blur(1px)');
};

const supportsSvgFilterPrimitives = (): boolean => {
  if (!isClient) return false;

  return (
    typeof window.SVGFETurbulenceElement !== 'undefined' &&
    typeof window.SVGFEDisplacementMapElement !== 'undefined' &&
    typeof window.SVGFEGaussianBlurElement !== 'undefined'
  );
};

const compatFeatureSpecs: Record<CompatFeature, CompatFeatureSpec> = {
  landingSvgFilterReference: {
    check: () => supportsCssFilters() && supportsSvgFilterPrimitives(),
    shouldWorkaround: (isSupported) => !isSupported || isFirefox(),
  },
};

export const isCompatFeatureSupported = (feature: CompatFeature): boolean =>
  compatFeatureSpecs[feature].check();

export const shouldApplyCompatWorkaround = (feature: CompatFeature): boolean => {
  const spec = compatFeatureSpecs[feature];
  const isSupported = spec.check();

  if (!spec.shouldWorkaround) {
    return !isSupported;
  }

  return spec.shouldWorkaround(isSupported);
};
