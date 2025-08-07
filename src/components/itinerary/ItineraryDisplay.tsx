import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Calendar, MapPin, DollarSign, Clock, Star } from "lucide-react";
import { TravelItinerary } from "@/types/travel";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ItineraryDisplayProps {
  itinerary: TravelItinerary;
  onNewTrip: () => void;
}

export const ItineraryDisplay = ({ itinerary, onNewTrip }: ItineraryDisplayProps) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const element = document.getElementById('itinerary-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${itinerary.destination}-itinerary.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">
            Your Perfect Itinerary
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready for your amazing trip to {itinerary.destination}!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button 
            onClick={generatePDF} 
            variant="hero" 
            size="lg"
            disabled={isGeneratingPDF}
          >
            <Download className="w-5 h-5 mr-2" />
            {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
          </Button>
          <Button onClick={onNewTrip} variant="outline" size="lg">
            Plan Another Trip
          </Button>
        </div>

        {/* Itinerary Content */}
        <div id="itinerary-content" className="space-y-8">
          {/* Trip Overview */}
          <Card className="card-glow p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Destination</p>
                  <p className="font-semibold">{itinerary.destination}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{itinerary.duration} Days</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-tertiary rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Est. Budget</p>
                  <p className="font-semibold">${itinerary.budget_info?.total_estimated || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-rainbow rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Activities</p>
                  <p className="font-semibold">{itinerary.days?.reduce((acc, day) => acc + (day.activities?.length || 0), 0) || 0}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Daily Itinerary */}
          {itinerary.days?.map((day, index) => (
            <Card key={index} className="card-glow p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Day {day.day}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{day.date}</h3>
                  <p className="text-muted-foreground">
                    {day.activities?.length || 0} activities planned
                  </p>
                </div>
              </div>

              {/* Activities */}
              {day.activities?.map((activity, actIndex) => (
                <div key={actIndex} className="flex gap-4 mb-4 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-gradient-primary rounded-full"></div>
                    {actIndex < (day.activities?.length || 0) - 1 && (
                      <div className="w-0.5 h-16 bg-gradient-primary/30 mt-2"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold text-primary">{activity.time}</span>
                        <span className="text-sm text-muted-foreground">
                          ({activity.duration})
                        </span>
                      </div>
                      {activity.cost && (
                        <span className="text-sm font-semibold text-app-success">
                          ${activity.cost}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-1">{activity.name}</h4>
                    <p className="text-muted-foreground mb-2">{activity.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{activity.location}</span>
                    </div>
                    
                    {activity.tips && activity.tips.length > 0 && (
                      <div className="mt-3 p-3 bg-app-info/10 rounded-lg">
                        <p className="text-sm font-medium text-app-info mb-1">Tips:</p>
                        <ul className="text-sm text-muted-foreground">
                          {activity.tips.map((tip, tipIndex) => (
                            <li key={tipIndex}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Meals */}
              {day.meals && day.meals.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <span>🍽️</span> Recommended Meals
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {day.meals.map((meal, mealIndex) => (
                      <div key={mealIndex} className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium capitalize">{meal.type}</span>
                          {meal.cost && (
                            <span className="text-sm text-app-success">${meal.cost}</span>
                          )}
                        </div>
                        <h5 className="font-semibold">{meal.name}</h5>
                        <p className="text-sm text-muted-foreground">{meal.location}</p>
                        {meal.description && (
                          <p className="text-sm mt-2">{meal.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}

          {/* Travel Tips */}
          {itinerary.travel_tips && itinerary.travel_tips.length > 0 && (
            <Card className="card-glow p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                💡 Travel Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {itinerary.travel_tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-gradient-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};