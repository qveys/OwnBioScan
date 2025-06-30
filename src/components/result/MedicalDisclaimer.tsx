import React, { memo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { AnimatedSection } from '../ui';

const MedicalDisclaimer: React.FC = memo(() => (
  <AnimatedSection animation="fade-in" delay={0.6}>
    <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-montserrat font-bold uppercase text-orange-800 mb-2">
            Important Medical Disclaimer
          </h3>
          <p className="text-orange-700 leading-relaxed">
            This test is indicative and does not replace professional medical diagnosis. 
            Results should be confirmed by an accredited medical laboratory. 
            Always consult your doctor for a complete evaluation of your cardiovascular health, 
            especially if you have family history or risk factors.
          </p>
        </div>
      </div>
    </div>
  </AnimatedSection>
));

MedicalDisclaimer.displayName = 'MedicalDisclaimer';

export default MedicalDisclaimer;