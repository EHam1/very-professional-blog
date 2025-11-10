import { ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { trackEvent } from '@/lib/tracking';

interface ABTestProps {
  experiment: string;
  children: ReactNode;
}

interface VariantProps {
  name: string;
  children: ReactNode;
}

export default function ABTest({ experiment, children }: ABTestProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const cookieName = `ab_${experiment}`;

  useEffect(() => {
    setMounted(true);
    
    // Get or set variant assignment
    let variant = Cookies.get(cookieName);
    
    if (!variant) {
      // Extract variants from children
      const variants: string[] = [];
      if (Array.isArray(children)) {
        children.forEach((child: any) => {
          if (child?.props?.name) {
            variants.push(child.props.name);
          }
        });
      }

      // Randomly assign variant
      if (variants.length > 0) {
        variant = variants[Math.floor(Math.random() * variants.length)];
        Cookies.set(cookieName, variant, { expires: 30 }); // 30 days
        
        // Track the assignment
        trackEvent('ab-test-assignment', {
          experiment,
          variant,
        });
      }
    }

    setSelectedVariant(variant || null);
  }, [experiment, children, cookieName]);

  // Don't render until client-side (prevents hydration mismatch)
  if (!mounted || !selectedVariant) {
    return null;
  }

  // Find and render the selected variant
  if (Array.isArray(children)) {
    const selectedChild = children.find(
      (child: any) => child?.props?.name === selectedVariant
    );
    return <>{selectedChild}</>;
  }

  return <>{children}</>;
}

// Variant component
ABTest.Variant = function Variant({ children }: VariantProps) {
  return <>{children}</>;
};

