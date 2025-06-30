import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProgressBar } from '../ui';

const ResultHeader: React.FC = memo(() => (
  <header className="bg-white shadow-subtle">
    <div className="container mx-auto px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/capture" 
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </Link>
          <div className="h-6 w-px bg-gray-300"></div>
          <h1 className="text-2xl font-montserrat font-bold uppercase text-gray-800">
            Résultats du Test
          </h1>
        </div>
        <ProgressBar currentStep={3} totalSteps={4} />
      </div>
    </div>
  </header>
));

ResultHeader.displayName = 'ResultHeader';

export default ResultHeader;