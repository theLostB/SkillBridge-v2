
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share, ArrowUp, RefreshCw } from "lucide-react";
import { FormData } from "./MultiStepForm";

interface RoadmapDisplayProps {
  roadmap: string;
  formData: FormData;
  onRegenerate: () => void;
  onStartOver: () => void;
  isLoading: boolean;
}

const RoadmapDisplay = ({ roadmap, formData, onRegenerate, onStartOver, isLoading }: RoadmapDisplayProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const [canRegenerate, setCanRegenerate] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const lastRegeneration = localStorage.getItem('last-regeneration');
    if (lastRegeneration) {
      const timeDiff = Date.now() - parseInt(lastRegeneration);
      const fiveMinutes = 5 * 60 * 1000;
      
      if (timeDiff < fiveMinutes) {
        setCanRegenerate(false);
        setTimeRemaining(Math.ceil((fiveMinutes - timeDiff) / 1000));
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!canRegenerate && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setCanRegenerate(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [canRegenerate, timeRemaining]);

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const formattedRoadmap = formatMarkdownForPDF(roadmap);

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>SkillBridge Career Roadmap</title>
            <meta charset="UTF-8">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body { 
                font-family: 'Arial', 'Helvetica', sans-serif; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px; 
                line-height: 1.6;
                color: #333;
                background: white;
              }
              .header { 
                text-align: center; 
                margin-bottom: 30px; 
                border-bottom: 3px solid #667eea;
                padding-bottom: 20px;
              }
              .header h1 { 
                color: #667eea; 
                margin-bottom: 10px; 
                font-size: 28px;
                font-weight: bold;
              }
              .header p { 
                margin: 5px 0; 
                color: #666; 
              }
              .roadmap-content { 
                margin-top: 20px; 
              }
              h1 { 
                color: #4c1d95; 
                font-size: 24px; 
                margin: 25px 0 15px 0; 
                border-bottom: 2px solid #a78bfa; 
                padding-bottom: 8px; 
              }
              h2 { 
                color: #5b21b6; 
                font-size: 20px; 
                margin: 20px 0 12px 0; 
                border-bottom: 1px solid #c4b5fd; 
                padding-bottom: 5px; 
              }
              h3 { 
                color: #6d28d9; 
                font-size: 18px; 
                margin: 15px 0 10px 0; 
                font-weight: 600;
              }
              ul, ol { 
                margin: 10px 0 15px 25px; 
              }
              li { 
                margin: 5px 0; 
                line-height: 1.5;
              }
              p { 
                margin: 10px 0; 
                line-height: 1.6;
              }
              strong { 
                color: #374151; 
                font-weight: 600; 
              }
              em { 
                color: #4b5563; 
                font-style: italic; 
              }
              code { 
                background: #f3f4f6; 
                padding: 2px 6px; 
                border-radius: 3px; 
                font-family: 'Courier New', monospace; 
                font-size: 0.9em;
              }
              .section {
                margin-bottom: 20px;
                page-break-inside: avoid;
              }
              @media print {
                body { 
                  font-size: 12px; 
                  padding: 15px;
                }
                .header h1 {
                  font-size: 22px;
                }
                h1 { font-size: 18px; }
                h2 { font-size: 16px; }
                h3 { font-size: 14px; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>SkillBridge Career Roadmap</h1>
              <p><strong>Generated on:</strong> ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>Career Goal:</strong> ${formData.goals || 'Career Development'}</p>
              <p><strong>Learning Style:</strong> ${formData.preferredLearningStyle || 'Not specified'}</p>
            </div>
            <div class="roadmap-content">${formattedRoadmap}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      
      // Wait for content to load then print
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My SkillBridge Career Roadmap',
          text: 'Check out my personalized career roadmap generated by SkillBridge AI!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`Check out my personalized career roadmap: ${window.location.href}`);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.log('Share cancelled or failed');
    }
    
    setIsSharing(false);
  };

  const handleRegenerate = () => {
    if (canRegenerate) {
      localStorage.setItem('last-regeneration', Date.now().toString());
      setCanRegenerate(false);
      setTimeRemaining(300); // 5 minutes
      onRegenerate();
    }
  };

  const formatMarkdownForPDF = (text: string) => {
    if (!text) return '';
    
    return text
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Lists
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^\+ (.*$)/gim, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
      // Wrap consecutive list items in ul tags
      .replace(/(<li>.*<\/li>\s*)+/gs, '<ul>$&</ul>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[h|u|l])(.+)$/gim, '<p>$1</p>')
      // Clean up
      .replace(/<p><\/p>/g, '')
      .replace(/<p>(<[h|u])/g, '$1')
      .replace(/(<\/[h|u].*>)<\/p>/g, '$1');
  };

  const formatMarkdown = (text: string) => {
    if (!text) return '';
    
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-purple-700 mt-6 mb-3 border-b border-purple-200 pb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-purple-800 mt-8 mb-4 border-b-2 border-purple-300 pb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-purple-900 mt-10 mb-6 border-b-2 border-purple-400 pb-3">$1</h1>')
      .replace(/^\* (.*$)/gim, '<li class="ml-6 mb-2 list-disc">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2 list-disc">$1</li>')
      .replace(/^\+ (.*$)/gim, '<li class="ml-6 mb-2 list-disc">$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-6 mb-2 list-decimal">$2</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/\n\n/g, '<div class="mb-4"></div>')
      .replace(/\n/g, '<br>');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-secondary p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="backdrop-blur-lg bg-white/95 shadow-2xl border-0 mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
              Your Personalized Career Roadmap
            </CardTitle>
            <p className="text-gray-600 mb-4">
              Generated on {new Date().toLocaleDateString()}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                className="flex items-center gap-2 hover:bg-purple-50"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              
              <Button
                onClick={handleShare}
                variant="outline"
                disabled={isSharing}
                className="flex items-center gap-2 hover:bg-blue-50"
              >
                <Share className="h-4 w-4" />
                {isSharing ? 'Sharing...' : 'Share'}
              </Button>
              
              <Button
                onClick={handleRegenerate}
                disabled={isLoading || !canRegenerate}
                className="bg-gradient-primary text-white hover:opacity-90 flex items-center gap-2"
                title={!canRegenerate ? `Wait ${formatTime(timeRemaining)} before regenerating` : ''}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Regenerating...' : !canRegenerate ? `Wait ${formatTime(timeRemaining)}` : 'Regenerate'}
              </Button>
              
              <Button
                onClick={onStartOver}
                variant="outline"
                className="flex items-center gap-2 hover:bg-red-50"
              >
                <ArrowUp className="h-4 w-4" />
                Start Over
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card className="backdrop-blur-lg bg-white/95 shadow-2xl border-0">
          <CardContent className="p-8">
            {roadmap ? (
              <div 
                className="prose prose-lg max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMarkdown(roadmap) }}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No roadmap generated yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoadmapDisplay;
