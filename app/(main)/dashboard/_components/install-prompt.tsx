"use client";

import { Button } from "@/components/ui/button";
import useBeforeInstallPrompt from "@/hooks/useBeforeInstallPrompt";
import { useEffect, useState } from "react";

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const { isInstalled, addToHomeScreen } = useBeforeInstallPrompt();

  useEffect(() => {
    console.log("InstallPrompt 컴포넌트가 마운트됨");
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    console.log("이미 설치된 상태 (standalone 모드)");
    return null;
  }

  return (
    <div>
      <h3>Install App</h3>
      <h2>IsInstalled:{isInstalled}</h2>

      <Button onClick={addToHomeScreen}>Add to Home Screen</Button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          and then &ldquo;Add to Home Screen&rdquo;
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      )}
    </div>
  );
}
