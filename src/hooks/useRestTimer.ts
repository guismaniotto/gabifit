import { useState, useEffect, useCallback, useRef } from "react";

// Generate beep sound with specific frequency
function createBeep(frequency: number, duration: number): HTMLAudioElement {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
  
  // Return a dummy audio element for compatibility
  return new Audio();
}

export function useRestTimer() {
  const [remaining, setRemaining] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);
  const endTimeRef = useRef<number>(0);
  const lastBeepRef = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for final alarm
    audioRef.current = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQMTl97NtGUJAZfa1L1hBweY3Mm6ZggKm+HLt2AGB6bh0a5cAACx5daXTQICt+vekkQAAsDz6n86AAK97/V6NgAEvvT8dzIABrf3/n0vAAex/f+DKwAIrf//iyYADan//5EgAA+k//+XGgASn///nBQAFJr//6IOABWV//+oCAAXkP//rQIAGYr//7H9/xp///+1+f8bev//ufT/HHX//73v/x5w///B6f8fav//xeT/IGT//8jf/yFe///L2v8iWP//z9T/I1L//9LP/yRM///VyP8mRv//2ML/J0D//9u8/yg5///dtv8pM///4K//KS3//+Ko/yom///lo/8rIP//557/LBn//+mY/ywT///slP8tDP//7o7/Lgb///GK/y////OE/zD5//X9/zHy//j3/zLs//rw/zPl//zt/zPe///o/zTY///k/zTR///h/zTK///d/zXE///a/zbE///W/zW+///T/za4///Q/za4///L/zay///I/zar///F/zar///B/zak///+/zae////+v82mP///fb/Npj///3x/zaR///77f82i////Of/NYT///zi/zV9///94f81d////N3/NHD///vZ/zRq///62f80Y///+tT/M1z///vP/zJV///7zv8yT////Mj/MUj///zE/zFB///8v/8wOv///Lr/MDT///24/y8t///+s/8uJv///a//LiD///+p/y0Z////pP8sE////5//Kwz///+b/yoG////lf8p/////5D/KPn///+L/yfy////hv8m7P///4H/Je7///96/yTo////dP8k4////27/I9v///9p/yLV////Y/8i0P///1z/Icr///9X/yHF////Uv8gv////0z/ILn///9G/yC0////QP8fr////zv/H6n///82/x6k////MP8en////yv/Hpr///8l/x2U////IP8dk////xr/HYX///8V/xyA////D/8ce////wr/HHn///8E/xx0//////8bdf//////HG///////x1q//////8eZP//////H17//////yBY//////8hU///////Ik3//////yNH//////8lQv//////Jjz//////yc2//////8oMf//////KSv//////yom//////8rIP//////LBv//////y0V//////8uEP//////Lwv//////zAF//////8x////////Mvr/////M/X/////NfD/////Nuv/////N+X/////ON//////Odr/////O9T/////PM//////Psr/////P8X/////QcD/////Qrv/////Q7b/////RbH/////Rqz/////R6f/////SaL/////Sp3/////S5j/////TZP/////To//////T4r/////UIX/////UoH/////U3z/////VHf/////Vnj/////V3T/////WHD/////WWv/////W2f/////XGP/////XWD/////Xlz/////X1n/////YVX/////YlL/////Y0//////ZEz/////ZUn/////Zkf/////Z0T/////aUL/////akD/////az//////bD3/////bTz/////bjv/////bzr/////cDn/////cTn/////cjj/////czj/////dDj/////dTj/////djj/////dzj/////eDj/////eTn/////ejn/////ezr/////fDr/////fTv/////fjv/////fzz/////gDz/////gT3/////gj7/////gz7/////hD//////hUD/////hkD/////h0H/////iEH/////iUL/////ikL/////i0P/////jEP/////jUT/////jkT/////j0X/////kEb/////kUb/////kkf/////k0f/////lEj/////lUn/////lkn/////l0r/////mEv/////mUz/////mkz/////m03/////nE7/////nU//////nk//////n1D/////oFH/////oVL/////olP/////o1T/////pFT/////pVX/////plb/////p1f/////qFj/////qVn/////qlr/////q1v/////rFz/////rV3/////rl7/////r1//////sGD/////sWH/////smL/////s2P/////tGT/////tWX/////tmb/////t2f/////uGj/////uWr/////umv/////u2z/////vG3/////vW7/////vW//////v3D/////wHH/////wXL/////wnP/////w3T/////xHX/////xXb/////xnf/////x3j/////yHn/////yXr/////ynv/////y3z/////zH3/////zX7/////zn//////z4D/////0IH/////0YL/////0oP/////04T/////1IX/////1Yb/////14j/////2In/////2Yr/////2ov/////24z/////3I3/////3Y7/////3o//////35D/////4JH/////4ZL/////4pP/////45T/////5JX/////5Zb/////5pf/////55j/////6Jn/////6Zr/////6pv/////65z/////7J3/////7Z//////7qD/////76H/////8KL/////8aP/////8qT/////86X/////9Kb/////9af/////9qj/////96n/////+Kr/////+av/////+qz/////"
    );
  }, []);

  // Play countdown beep with progressive frequency
  const playCountdownBeep = useCallback((secondsLeft: number) => {
    try {
      // Progressive frequency: 3s = 400Hz, 2s = 600Hz, 1s = 800Hz
      const frequencies: Record<number, number> = {
        3: 400,
        2: 600,
        1: 800,
      };
      
      const frequency = frequencies[secondsLeft];
      if (frequency) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = "sine";
        
        const duration = secondsLeft === 1 ? 0.3 : 0.15;
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      }
    } catch (e) {
      console.log("Audio playback failed:", e);
    }
  }, []);

  // Calculate remaining time based on timestamp
  const updateRemaining = useCallback(() => {
    if (!isActive || endTimeRef.current === 0) return;
    
    const now = Date.now();
    const newRemaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
    
    // Play countdown beeps for last 3 seconds
    if (newRemaining <= 3 && newRemaining > 0 && newRemaining !== lastBeepRef.current) {
      lastBeepRef.current = newRemaining;
      playCountdownBeep(newRemaining);
    }
    
    if (newRemaining <= 0) {
      setRemaining(0);
      setIsActive(false);
      endTimeRef.current = 0;
      lastBeepRef.current = 0;
      // Play final alarm sound
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          console.log("Audio playback failed");
        });
      }
    } else {
      setRemaining(newRemaining);
    }
  }, [isActive, playCountdownBeep]);

  // Update timer every second
  useEffect(() => {
    if (!isActive) return;

    // Update more frequently to catch countdown beeps
    const interval = setInterval(updateRemaining, 200);
    return () => clearInterval(interval);
  }, [isActive, updateRemaining]);

  // Recalculate when tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isActive) {
        updateRemaining();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isActive, updateRemaining]);

  const start = useCallback((seconds: number) => {
    setTotalSeconds(seconds);
    setRemaining(seconds);
    endTimeRef.current = Date.now() + seconds * 1000;
    lastBeepRef.current = 0;
    setIsActive(true);
  }, []);

  const skip = useCallback(() => {
    setIsActive(false);
    setRemaining(0);
    setTotalSeconds(0);
    endTimeRef.current = 0;
    lastBeepRef.current = 0;
  }, []);

  const addTime = useCallback((seconds: number) => {
    if (endTimeRef.current > 0) {
      endTimeRef.current += seconds * 1000;
      setTotalSeconds((prev) => prev + seconds);
      updateRemaining();
    }
  }, [updateRemaining]);

  const progress = totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) * 100 : 0;

  return {
    remaining,
    isActive,
    progress,
    start,
    skip,
    addTime,
  };
}
