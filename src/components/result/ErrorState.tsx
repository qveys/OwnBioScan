import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, XCircle, RotateCcw } from 'lucide-react';
import { Button, Card } from '../ui';

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = memo(({ error }) => (
  <div className="min-h-screen bg-gradient-to-b from-mint/20 to-white">
    <header className="bg-white shadow-subtle">
      <div className="container mx-auto px-4 md:px-6 py-4">
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
            Erreur d'Analyse
          </h1>
        </div>
      </div>
    </header>

    <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <Card variant="highlight" className="bg-red-50 border-red-200 text-center max-w-2xl mx-auto">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-montserrat font-bold uppercase text-red-800 mb-4">
          Analyse Impossible
        </h2>
        <p className="text-red-700 mb-6">{error}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" href="/capture">
            <RotateCcw className="w-5 h-5 mr-2" />
            Reprendre la Photo
          </Button>
          <Button variant="outline" href="/demo">
            Retour au Menu
          </Button>
        </div>
      </Card>
    </main>
  </div>
));

ErrorState.displayName = 'ErrorState';

export default ErrorState;