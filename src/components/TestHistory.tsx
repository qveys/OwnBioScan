import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  TestTube, 
  Calendar, 
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useTestHistory } from '../hooks/useTestHistory';
import { NAVIGATION_STEPS, getBreadcrumbs, getCurrentStep } from '../data/navigation';
import { Button, ProgressBar, Breadcrumbs } from './ui';
import { SuccessAnimation } from './common';
import { StatsCard, TestCard, EmptyState, ConfirmModal } from './history';
import type { TestResult } from '../utils/colorAnalysis';

const HistorySkeleton: React.FC = memo(() => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-subtle">
          <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-3/5 mx-auto animate-pulse" />
        </div>
      ))}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-subtle">
          <div className="flex justify-between items-start mb-4">
            <div className="h-4 bg-gray-200 rounded w-2/5 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/5 animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-10 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  </div>
));

HistorySkeleton.displayName = 'HistorySkeleton';

const TestHistory: React.FC = memo(() => {
  const {
    tests,
    stats,
    isLoading,
    error,
    deleteTest,
    clearHistory,
    downloadPDF,
    openPDF
  } = useTestHistory();

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'delete' | 'clear';
    testId?: string;
  }>({ isOpen: false, type: 'delete' });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const currentStep = getCurrentStep('/history');
  const breadcrumbs = getBreadcrumbs('/history');

  const handleViewDetails = (test: TestResult) => {
    localStorage.setItem('capturedTestImage', test.imageDataUrl);
    localStorage.setItem('captureTimestamp', new Date(test.timestamp).toISOString());
    window.location.href = '/result';
  };

  const handleDeleteConfirm = () => {
    if (confirmModal.type === 'delete' && confirmModal.testId) {
      deleteTest(confirmModal.testId);
      setSuccessMessage('Test deleted successfully');
    } else if (confirmModal.type === 'clear') {
      clearHistory();
      setSuccessMessage('History cleared successfully');
    }
    setConfirmModal({ isOpen: false, type: 'delete' });
  };

  const getTrendIndicator = () => {
    if (tests.length < 2) return null;
    
    const recent = tests[0].cholesterolValue;
    const previous = tests[1].cholesterolValue;
    const trend = recent - previous;
    
    if (Math.abs(trend) < 5) return { text: 'Stable', color: 'text-blue-600' };
    return trend < 0 
      ? { text: `↓ ${Math.abs(trend)} mg/dL`, color: 'text-green-600' }
      : { text: `↑ ${trend} mg/dL`, color: 'text-red-600' };
  };

  const formatLastTestDate = () => {
    if (!stats.lastTest) return 'None';
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium'
    }).format(stats.lastTest);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/20 to-white">
      {successMessage && (
        <SuccessAnimation 
          message={successMessage}
          duration={3000}
          onComplete={() => setSuccessMessage(null)}
        />
      )}
      
      <header className="bg-white shadow-subtle">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link 
                to="/demo" 
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-montserrat font-bold uppercase text-gray-800">
                Test History
              </h1>
            </div>
          </div>
          
          <Breadcrumbs items={breadcrumbs} className="mb-4" />
          
          <ProgressBar 
            currentStep={currentStep}
            totalSteps={NAVIGATION_STEPS.length - 1}
            steps={NAVIGATION_STEPS}
            className="max-w-2xl mx-auto"
          />
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 animate-fade-in">
            {error}
          </div>
        )}

        {isLoading ? (
          <HistorySkeleton />
        ) : tests.length === 0 ? (
          <div className="animate-fade-in">
            <EmptyState />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in-up">
              <StatsCard
                icon={TestTube}
                title="Tests Performed"
                value={stats.totalTests}
                color="text-primary"
              />
              <StatsCard
                icon={Calendar}
                title="Last Test"
                value={formatLastTestDate()}
                color="text-blue-600"
              />
              <StatsCard
                icon={BarChart3}
                title="Average"
                value={`${stats.averageValue} mg/dL`}
                color="text-green-600"
              />
              <StatsCard
                icon={TrendingUp}
                title="Trend"
                value={getTrendIndicator()?.text || 'N/A'}
                color={getTrendIndicator()?.color || 'text-gray-600'}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 animate-fade-in-up">
              <h2 className="text-xl font-montserrat font-bold uppercase">
                Your Tests ({tests.length})
              </h2>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setConfirmModal({ isOpen: true, type: 'clear' })}
                  className="flex items-center gap-2 text-red-600 hover:bg-red-50 border-red-200 hover:scale-105 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear History
                </Button>
                <Button
                  variant="primary"
                  href="/demo"
                  className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  New Test
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.map((test, index) => (
                <div 
                  key={test.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TestCard
                    test={test}
                    onViewDetails={handleViewDetails}
                    onDownloadPDF={downloadPDF}
                    onDelete={(id) => setConfirmModal({ 
                      isOpen: true, 
                      type: 'delete', 
                      testId: id 
                    })}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.type === 'delete' ? 'Delete Test' : 'Clear History'}
          message={
            confirmModal.type === 'delete'
              ? 'Are you sure you want to delete this test? This action cannot be undone.'
              : 'Are you sure you want to delete all tests? This action cannot be undone.'
          }
          confirmText={confirmModal.type === 'delete' ? 'Delete' : 'Clear All'}
          cancelText="Cancel"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmModal({ isOpen: false, type: 'delete' })}
          variant="danger"
        />
      </main>
    </div>
  );
});

TestHistory.displayName = 'TestHistory';

export default TestHistory;