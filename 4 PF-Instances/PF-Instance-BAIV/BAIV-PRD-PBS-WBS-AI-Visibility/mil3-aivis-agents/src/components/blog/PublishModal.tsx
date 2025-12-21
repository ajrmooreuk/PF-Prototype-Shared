import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon, Download, Globe } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Blog {
  id: string;
  title: string;
}

interface PublishModalProps {
  blog: Blog;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PublishModal({ blog, open, onOpenChange }: PublishModalProps) {
  const [destination, setDestination] = useState('download');
  const [publishTiming, setPublishTiming] = useState('now');
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (publishTiming === 'scheduled' && scheduledDate) {
      const formattedDate = scheduledDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      toast.success(`Blog scheduled for ${formattedDate}`);
    } else {
      toast.success('Blog published successfully!');
    }
    
    setIsPublishing(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
            Publish Blog
          </DialogTitle>
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Open Sans' }}>
            {blog.title}
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Destination Selector */}
          <div>
            <Label className="text-[#005260] mb-3 block" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              Publish Destination
            </Label>
            <RadioGroup value={destination} onValueChange={setDestination}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:border-[#02a4bf] transition-colors cursor-pointer">
                  <RadioGroupItem value="download" id="download" />
                  <Label htmlFor="download" className="flex-1 cursor-pointer" style={{ fontFamily: 'Open Sans' }}>
                    <div className="flex items-center gap-2">
                      <Download className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-semibold">Download HTML</div>
                        <div className="text-sm text-gray-500">Get a downloadable HTML file</div>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:border-[#02a4bf] transition-colors cursor-pointer opacity-50">
                  <RadioGroupItem value="wordpress" id="wordpress" disabled />
                  <Label htmlFor="wordpress" className="flex-1 cursor-pointer" style={{ fontFamily: 'Open Sans' }}>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-semibold">WordPress</div>
                        <div className="text-sm text-gray-500">Requires connection setup</div>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:border-[#02a4bf] transition-colors cursor-pointer opacity-50">
                  <RadioGroupItem value="shopify" id="shopify" disabled />
                  <Label htmlFor="shopify" className="flex-1 cursor-pointer" style={{ fontFamily: 'Open Sans' }}>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-semibold">Shopify</div>
                        <div className="text-sm text-gray-500">Requires connection setup</div>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:border-[#02a4bf] transition-colors cursor-pointer opacity-50">
                  <RadioGroupItem value="webflow" id="webflow" disabled />
                  <Label htmlFor="webflow" className="flex-1 cursor-pointer" style={{ fontFamily: 'Open Sans' }}>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-semibold">Webflow</div>
                        <div className="text-sm text-gray-500">Requires connection setup</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Timing Selector */}
          <div>
            <Label className="text-[#005260] mb-3 block" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              Publication Timing
            </Label>
            <RadioGroup value={publishTiming} onValueChange={setPublishTiming}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="now" id="now" />
                  <Label htmlFor="now" className="cursor-pointer" style={{ fontFamily: 'Open Sans' }}>
                    Publish Now
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled" className="cursor-pointer" style={{ fontFamily: 'Open Sans' }}>
                    Schedule for Later
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {publishTiming === 'scheduled' && (
              <div className="mt-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduledDate ? scheduledDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPublishing}
            style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isPublishing || (publishTiming === 'scheduled' && !scheduledDate)}
            className="bg-[#02a4bf] hover:bg-[#028a9f]"
            style={{ fontFamily: 'Poppins', fontWeight: 600 }}
          >
            {isPublishing ? 'Publishing...' : publishTiming === 'scheduled' ? 'Schedule Blog' : 'Publish Blog'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
