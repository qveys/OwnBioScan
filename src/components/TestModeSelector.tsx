import React, { memo, useState } from 'react';
import { Camera, TestTube, ArrowRight, Eye } from 'lucide-react';
import { generateReferenceImage, getSupportedLevels } from '../data/cholesterolReference';
import { Button, Card } from './ui';

interface TestImage {
  level: number;
  label: string;
  description: string;
}

const TEST_IMAGES: TestImage[] = [
  { level: 160, label: 'Normal', description: 'Normal cholesterol (160 mg/dL)' },
  { level: 200, label: 'Borderline', description: 'Borderline cholesterol (200 mg/dL)' },
  { level: 260, label: 'High', description: 'High cholesterol (260 mg/dL)' },
  { level: 300, label: 'Critical', description: 'Critical cholesterol (300 mg/dL)' }
];

interface TestModeSelectorProps {
  onModeSelect: (mode: 'camera' | 'demo', imageData?: string) => void;
}

const TestModeSelector: React.FC<TestModeSelectorProps> = memo(({ onModeSelect }) => {
  const [selectedImage, setSelectedImage] = useState<TestImage | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageSelect = (testImage: TestImage) => {
    setSelectedImage(testImage);
    try {
      const imageData = generateReferenceImage(testImage.level);
      setPreviewImage(imageData);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleDemoStart = () => {
    if (selectedImage && previewImage) {
      localStorage.setItem('capturedTestImage', previewImage);
      localStorage.setItem('captureTimestamp', new Date().toISOString());
      onModeSelect('demo', previewImage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/20 to-white">
      <header className="bg-white shadow-subtle">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <h1 className="text-2xl font-montserrat font-bold uppercase text-gray-800">
            Choose Test Mode
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Mode selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card 
              className="cursor-pointer hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-primary"
              onClick={() => onModeSelect('camera')}
            >
              <div className="text-center">
                <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-montserrat font-bold uppercase mb-2">
                  Camera Mode
                </h3>
                <p className="text-text-secondary mb-4">
                  Use your camera to scan a real test strip
                </p>
                <Button variant="primary" className="w-full">
                  Use Camera
                </Button>
              </div>
            </Card>

            <Card className="border-2 border-accent">
              <div className="text-center">
                <TestTube className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-montserrat font-bold uppercase mb-2">
                  Demo Mode
                </h3>
                <p className="text-text-secondary mb-4">
                  Test with simulated strip images
                </p>
                <p className="text-sm text-accent font-medium">
                  Select an image below
                </p>
              </div>
            </Card>
          </div>

          {/* Test images */}
          <div className="mb-8">
            <h2 className="text-xl font-montserrat font-bold uppercase mb-6 text-center">
              Available Test Images
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TEST_IMAGES.map((testImage) => (
                <Card
                  key={testImage.level}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedImage?.level === testImage.level
                      ? 'border-2 border-accent bg-accent/5'
                      : 'hover:scale-105'
                  }`}
                  onClick={() => handleImageSelect(testImage)}
                >
                  <div className="text-center">
                    <div className="w-16 h-8 mx-auto mb-3 border rounded overflow-hidden">
                      <div 
                        className="w-full h-full"
                        style={{ 
                          background: `linear-gradient(to right, #fff 30%, ${
                            testImage.level === 160 ? '#E8D5B7' :
                            testImage.level === 200 ? '#C49A6B' :
                            testImage.level === 260 ? '#8B6F47' : '#6B4E31'
                          } 30%, ${
                            testImage.level === 160 ? '#E8D5B7' :
                            testImage.level === 200 ? '#C49A6B' :
                            testImage.level === 260 ? '#8B6F47' : '#6B4E31'
                          } 70%, #fff 70%)`
                        }}
                      />
                    </div>
                    <h4 className="font-bold text-sm mb-1">{testImage.label}</h4>
                    <p className="text-xs text-text-secondary">{testImage.level} mg/dL</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Preview and actions */}
          {selectedImage && previewImage && (
            <Card variant="highlight" className="text-center animate-fade-in">
              <h3 className="text-lg font-montserrat font-bold uppercase mb-4">
                Selected Image Preview
              </h3>
              <div className="mb-4">
                <img 
                  src={previewImage} 
                  alt={`Test ${selectedImage.label}`}
                  className="mx-auto border rounded shadow-md max-w-xs"
                />
              </div>
              <p className="text-text-secondary mb-6">
                {selectedImage.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedImage(null)}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Change Image
                </Button>
                <Button 
                  variant="accent"
                  onClick={handleDemoStart}
                  className="flex items-center gap-2"
                >
                  Analyze this Image
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
});

TestModeSelector.displayName = 'TestModeSelector';

export default TestModeSelector;