'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import type { Track } from '@/query/tracks/definitions';

type PanelContextType = {
    isOpen: boolean;
    track: Track | null;
    openPanel: (track: Track) => void;
    closePanel: () => void;
};

const PanelContext = createContext<PanelContextType>({
    isOpen: false,
    track: null,
    openPanel: () => { },
    closePanel: () => { },
});

export function PanelProvider({ children }: { children: ReactNode }) {
    const [track, setTrack] = useState<Track | null>(null);

    function openPanel(t: Track) {
        setTrack(t);
    }

    function closePanel() {
        setTrack(null);
    }

    return (
        <PanelContext.Provider value={{ isOpen: track !== null, track, openPanel, closePanel }}>
            {children}
        </PanelContext.Provider>
    );
}

export function usePanel() {
    return useContext(PanelContext);
}