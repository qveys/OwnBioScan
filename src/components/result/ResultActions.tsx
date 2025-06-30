import React, { memo, useState } from 'react';
import { Download, Save, RotateCcw, History, ExternalLink, Share2 } from 'lucide-react';
import { Button, Card, AnimatedSection } from '../ui';
import { generatePDF, openPDFInNewTab } from '../../utils/pdf';
import { saveTestResult } from '../../utils/storage';
import type { TestResult, AnalysisStats } from '../../utils/colorAnalysis';

interface ResultActionsProps {
  result: TestResult;
  stats: AnalysisStats;
}

const ResultActions: React.FC<ResultActionsProps> = memo(({ result, stats }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleSaveResult = async () => {
    try {
      setIsSaving(true);
      setSaveMessage(null);
      
      console.log('💾 Saving result...');
      saveTestResult(result);
      
      setSaveMessage('Result saved successfully!');
      setTimeout(() => setSaveMessage(null), 3000);
      
    } catch (error) {
      console.error('❌ Save error:', error);
      setSaveMessage('Error saving result');
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      console.log('📄 Generating PDF report...');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      generatePDF(result, stats);
      
      console.log('✅ PDF downloaded successfully');
    } catch (error) {
      console.error('❌ PDF generation error:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleOpenPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      console.log('📄 Opening PDF report...');
      
      await new Promise(resolve => setTimeout(resolve, 300));
      openPDFInNewTab(result, stats);
      
      console.log('✅ PDF opened in new tab');
    } catch (error) {
      console.error('❌ PDF opening error:', error);
      alert('Error opening PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cholesterol Test Result - OwnBioScan',
          text: `My cholesterol level: ${result.cholesterolValue} mg/dL`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `Cholesterol Test Result: ${result.cholesterolValue} mg/dL - ${stats.classification.description}`
        );
        alert('Result copied to clipboard!');
      } catch (error) {
        console.error('Copy error:', error);
      }
    }
  };

  return (
    <AnimatedSection animation="slide-in-right" delay={0.4}>
      <Card className="mb-8">
        <h3 className="text-xl font-montserrat font-bold uppercase mb-6 text-center">
          Available Actions
        </h3>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            PDF Report
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button 
              variant="primary"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center justify-center gap-2 py-3"
            >
              <Download className="w-5 h-5" />
              {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleOpenPDF}
              disabled={isGeneratingPDF}
              className="flex items-center justify-center gap-2 py-3"
            >
              <ExternalLink className="w-5 h-5" />
              Open PDF
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            Result Management
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Button 
              variant="accent"
              onClick={handleSaveResult}
              disabled={isSaving}
              className="flex items-center justify-center gap-2 py-3"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleShare}
              className="flex items-center justify-center gap-2 py-3"
            >
              <Share2 className="w-5 h-5" />
              Share
            </Button>
            
            <Button 
              variant="outline"
              href="/demo"
              className="flex items-center justify-center gap-2 py-3"
            >
              <RotateCcw className="w-5 h-5" />
              New Test
            </Button>
            
            <Button 
              variant="outline"
              href="/history"
              className="flex items-center justify-center gap-2 py-3"
            >
              <History className="w-5 h-5" />
              View History
            </Button>
          </div>
        </div>

        {saveMessage && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
            saveMessage.includes('success') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {saveMessage}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> The PDF report contains all your test details, 
            reference values and medical recommendations. You can share it 
            with your doctor or keep it for personal tracking.
          </p>
        </div>
      </Card>
    </AnimatedSection>
  );
});

ResultActions.displayName = 'ResultActions';

export default ResultActions;