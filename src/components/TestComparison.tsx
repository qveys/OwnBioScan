import React, { memo, useState, useEffect } from 'react';
import { TrendingUp, Info } from 'lucide-react';
import { getTestResults } from '../utils/storage';
import { Card, LoadingSpinner } from './ui';
import { TrendIndicator, ComparisonStats, HistoricalChart } from './comparison';
import type { TestResult } from '../utils/colorAnalysis';
import type { TrendData, HistoricalStats } from './comparison/types';

interface TestComparisonProps {
  currentResult: TestResult;
}

const TestComparison: React.FC<TestComparisonProps> = memo(({ currentResult }) => {
  const [historicalStats, setHistoricalStats] = useState<HistoricalStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistoricalData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        await new Promise(resolve => setTimeout(resolve, 500));

        const allTests = getTestResults();
        const historicalTests = allTests.filter(test => test.id !== currentResult.id);
        
        if (historicalTests.length === 0) {
          setHistoricalStats({
            average: currentResult.cholesterolValue,
            trend: null,
            testCount: 1,
            recentTests: []
          });
          return;
        }

        const average = Math.round(
          historicalTests.reduce((sum, test) => sum + test.cholesterolValue, 0) / historicalTests.length
        );

        let trend: TrendData | null = null;
        if (historicalTests.length > 0) {
          const mostRecentTest = historicalTests[0];
          const change = currentResult.cholesterolValue - mostRecentTest.cholesterolValue;
          const percentage = Math.round(Math.abs(change / mostRecentTest.cholesterolValue) * 100);
          
          let direction: 'up' | 'down' | 'stable' = 'stable';
          if (Math.abs(change) > 5) {
            direction = change > 0 ? 'up' : 'down';
          }

          trend = {
            direction,
            percentage,
            previousValue: mostRecentTest.cholesterolValue,
            change
          };
        }

        setHistoricalStats({
          average,
          trend,
          testCount: historicalTests.length + 1,
          recentTests: historicalTests.slice(0, 6)
        });

      } catch (err) {
        console.error('Error loading historical data:', err);
        setError('Unable to load historical data');
      } finally {
        setIsLoading(false);
      }
    };

    loadHistoricalData();
  }, [currentResult]);

  if (isLoading) {
    return (
      <Card className="mb-6">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="md" color="primary" text="Analyzing trends..." />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-6 bg-red-50 border-red-200">
        <div className="text-center py-8">
          <div className="text-red-600 mb-3 text-2xl">⚠️</div>
          <h3 className="font-bold text-red-800 mb-2">Loading Error</h3>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </Card>
    );
  }

  if (!historicalStats) {
    return null;
  }

  // First test case
  if (historicalStats.testCount === 1) {
    return (
      <Card className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center py-8 px-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <TrendingUp className="w-10 h-10 text-blue-600" />
          </div>
          
          <h3 className="text-xl font-montserrat font-bold uppercase mb-3 text-blue-900">
            🎉 First Test Recorded!
          </h3>
          
          <p className="text-base text-blue-700 mb-6 max-w-md mx-auto leading-relaxed">
            Congratulations! You've established your baseline value. 
            Continue taking regular tests to track your cholesterol evolution.
          </p>
          
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border-2 border-blue-300 shadow-sm">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-base text-blue-800 font-bold">
              Baseline value: {currentResult.cholesterolValue} mg/dL
            </span>
          </div>
          
          <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-300">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Tip</span>
            </div>
            <p className="text-xs text-blue-700">
              Take a new test in 2-3 months to start seeing trends
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h3 className="text-xl font-montserrat font-bold uppercase text-gray-800 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Detailed Historical Analysis
        </h3>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
          {historicalStats.testCount} tests analyzed
        </div>
      </div>
      
      <div className="mb-8">
        <ComparisonStats 
          stats={historicalStats}
          currentValue={currentResult.cholesterolValue}
        />
      </div>

      {historicalStats.trend && (
        <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            Detailed Trend Analysis
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                <strong>Comparison with previous test:</strong>
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-gray-700 font-medium">
                  {historicalStats.trend.previousValue} mg/dL
                </span>
                <span className="text-gray-400">→</span>
                <span className="text-gray-900 font-bold text-lg">
                  {currentResult.cholesterolValue} mg/dL
                </span>
              </div>
              <div className="flex justify-start">
                <TrendIndicator trend={historicalStats.trend} size="lg" />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="font-semibold text-gray-800 mb-2">Interpretation:</h5>
              <p className="text-sm text-gray-700 leading-relaxed">
                {historicalStats.trend.direction === 'up' && 
                  `Your cholesterol increased by ${Math.abs(historicalStats.trend.change)} mg/dL. Monitor your diet and consult your doctor if necessary.`}
                {historicalStats.trend.direction === 'down' && 
                  `Great news! Your cholesterol decreased by ${Math.abs(historicalStats.trend.change)} mg/dL. Keep up your efforts!`}
                {historicalStats.trend.direction === 'stable' && 
                  `Your cholesterol remains stable. Maintain your healthy lifestyle habits.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {historicalStats.recentTests.length > 0 && (
        <div className="mb-8">
          <HistoricalChart 
            tests={historicalStats.recentTests}
            currentValue={currentResult.cholesterolValue}
          />
        </div>
      )}

      {historicalStats.recentTests.length >= 2 && (
        <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
          <h4 className="font-bold text-indigo-800 mb-4 flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5" />
            Moving Average (Last 3 tests)
          </h4>
          
          {(() => {
            const lastThreeTests = [
              currentResult,
              ...historicalStats.recentTests.slice(0, 2)
            ];
            const threeTestAverage = Math.round(
              lastThreeTests.reduce((sum, test) => sum + test.cholesterolValue, 0) / lastThreeTests.length
            );
            
            return (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="text-center space-y-3">
                  <div className="text-4xl font-bold text-indigo-800">
                    {threeTestAverage} mg/dL
                  </div>
                  <div className="text-sm text-indigo-600 font-medium">
                    Smoothed average over {lastThreeTests.length} tests
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    threeTestAverage < 170 ? 'bg-green-100 text-green-800' :
                    threeTestAverage <= 240 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {threeTestAverage < 170 ? 'Normal' :
                     threeTestAverage <= 240 ? 'High' : 'Critical'}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h5 className="font-semibold text-indigo-800 mb-3">Value breakdown:</h5>
                  <div className="space-y-2">
                    {lastThreeTests.map((test, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {index === 0 ? 'Current' : `Test ${index + 1}`}
                        </span>
                        <span className={`font-medium ${index === 0 ? 'text-indigo-800' : 'text-gray-700'}`}>
                          {test.cholesterolValue} mg/dL
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </Card>
  );
});

TestComparison.displayName = 'TestComparison';

export default TestComparison;