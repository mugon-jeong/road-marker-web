"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PlaceDirectionsButton,
  IconButton,
  PlaceOverview,
} from "@googlemaps/extended-component-library/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PlaceDetailsProps {
  places: google.maps.places.Place[];
  selectedPlace: google.maps.places.Place | null;
}

const PlaceDetails = ({ places, selectedPlace }: PlaceDetailsProps) => {
  if (!places || places.length === 0) return null;
  const sortedPlaces = places.slice().sort((a, b) => {
    if (selectedPlace?.id === a.id) return -1;
    if (selectedPlace?.id === b.id) return 1;
    return 0;
  });

  return (
    <ScrollArea className="h-[calc(100vh-80px)]">
      <div className="p-4 space-y-4">
        {sortedPlaces.map((place, index) => (
          <div key={index} id={`place-${place.id}`}>
            <PlaceOverview
              size="large"
              place={place}
              googleLogoAlreadyDisplayed
            >
              <div slot="action" className="SlotDiv">
                <IconButton slot="action" variant="filled">
                  See Reviews
                </IconButton>
              </div>
              <div slot="action" className="SlotDiv">
                <PlaceDirectionsButton slot="action" variant="filled">
                  Directions
                </PlaceDirectionsButton>
              </div>
            </PlaceOverview>
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>더보기</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    {place.formattedAddress && (
                      <div>
                        <h3 className="font-semibold mb-1">주소</h3>
                        <p className="text-sm text-muted-foreground">
                          {place.formattedAddress}
                        </p>
                      </div>
                    )}

                    {place.rating && (
                      <div>
                        <h3 className="font-semibold mb-1">평점</h3>
                        <p className="text-sm text-muted-foreground">
                          {place.rating} / 5.0 ({place.userRatingCount}개의
                          평가)
                        </p>
                      </div>
                    )}

                    {place.internationalPhoneNumber && (
                      <div>
                        <h3 className="font-semibold mb-1">전화번호</h3>
                        <p className="text-sm text-muted-foreground">
                          {place.internationalPhoneNumber}
                        </p>
                      </div>
                    )}

                    {place.websiteURI && (
                      <div>
                        <h3 className="font-semibold mb-1">웹사이트</h3>
                        <a
                          href={place.websiteURI}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {place.websiteURI}
                        </a>
                      </div>
                    )}

                    {place.regularOpeningHours && (
                      <div>
                        <h3 className="font-semibold mb-2">영업시간</h3>
                        <ul className="space-y-1">
                          {place.regularOpeningHours.weekdayDescriptions?.map(
                            (description, index) => (
                              <li
                                key={index}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                              >
                                <span className="font-medium min-w-[40px]">
                                  {description.split(": ")[0]}:
                                </span>
                                <span>{description.split(": ")[1]}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default PlaceDetails;
