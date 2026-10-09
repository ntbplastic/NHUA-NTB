"use client";

import { useState, useEffect } from 'react';

// Lightweight event-based store using localStorage
const getLocalItem = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setLocalItem = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(`local-storage-${key}`));
  } catch {}
};

export const useSavedProducts = () => {
  const [saved, setSaved] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setSaved(getLocalItem('ntb_saved', []));
    const handleStorage = () => setSaved(getLocalItem('ntb_saved', []));
    window.addEventListener('local-storage-ntb_saved', handleStorage);
    return () => window.removeEventListener('local-storage-ntb_saved', handleStorage);
  }, []);

  const toggleSaved = (id: string) => {
    const current = getLocalItem('ntb_saved', []);
    const newSaved = current.includes(id) 
      ? current.filter((x: string) => x !== id)
      : [...current, id];
    setLocalItem('ntb_saved', newSaved);
  };

  const isSaved = (id: string) => isMounted ? saved.includes(id) : false;

  return { saved, toggleSaved, isSaved, isMounted };
};

export const useCompare = () => {
  const [compare, setCompare] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCompare(getLocalItem('ntb_compare', []));
    const handleStorage = () => setCompare(getLocalItem('ntb_compare', []));
    window.addEventListener('local-storage-ntb_compare', handleStorage);
    return () => window.removeEventListener('local-storage-ntb_compare', handleStorage);
  }, []);

  const toggleCompare = (id: string) => {
    const current = getLocalItem('ntb_compare', []);
    let newCompare = [];
    if (current.includes(id)) {
      newCompare = current.filter((x: string) => x !== id);
    } else {
      if (current.length >= 3) {
        alert("Chỉ có thể so sánh tối đa 3 sản phẩm.");
        return;
      }
      newCompare = [...current, id];
    }
    setLocalItem('ntb_compare', newCompare);
  };

  const isCompared = (id: string) => isMounted ? compare.includes(id) : false;

  return { compare, toggleCompare, isCompared, isMounted };
};

export interface RFQItem {
  productId: string;
  quantity?: number;
  notes?: string;
  needSample?: boolean;
}

export const useRFQ = () => {
  const [rfq, setRfq] = useState<RFQItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setRfq(getLocalItem('ntb_rfq', []));
    const handleStorage = () => setRfq(getLocalItem('ntb_rfq', []));
    window.addEventListener('local-storage-ntb_rfq', handleStorage);
    return () => window.removeEventListener('local-storage-ntb_rfq', handleStorage);
  }, []);

  const addToRFQ = (productId: string, needSample = false) => {
    const current = getLocalItem('ntb_rfq', []);
    if (!current.find((x: RFQItem) => x.productId === productId)) {
      setLocalItem('ntb_rfq', [...current, { productId, quantity: 10000, needSample }]);
    } else if (needSample) {
      // Update existing item to need sample
      setLocalItem('ntb_rfq', current.map((x: RFQItem) => x.productId === productId ? { ...x, needSample: true } : x));
    }
  };

  const removeFromRFQ = (productId: string) => {
    const current = getLocalItem('ntb_rfq', []);
    setLocalItem('ntb_rfq', current.filter((x: RFQItem) => x.productId !== productId));
  };
  
  const updateRFQItem = (productId: string, updates: Partial<RFQItem>) => {
    const current = getLocalItem('ntb_rfq', []);
    setLocalItem('ntb_rfq', current.map((x: RFQItem) => x.productId === productId ? { ...x, ...updates } : x));
  };
  
  const clearRFQ = () => setLocalItem('ntb_rfq', []);

  const isInRFQ = (productId: string) => isMounted ? rfq.some(x => x.productId === productId) : false;

  return { rfq, addToRFQ, removeFromRFQ, updateRFQItem, clearRFQ, isInRFQ, isMounted };
};

export const useRecentlyViewed = () => {
  const [recent, setRecent] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setRecent(getLocalItem('ntb_recent', []));
    const handleStorage = () => setRecent(getLocalItem('ntb_recent', []));
    window.addEventListener('local-storage-ntb_recent', handleStorage);
    return () => window.removeEventListener('local-storage-ntb_recent', handleStorage);
  }, []);

  const addRecent = (productId: string) => {
    const current = getLocalItem('ntb_recent', []);
    const filtered = current.filter((x: string) => x !== productId);
    setLocalItem('ntb_recent', [productId, ...filtered].slice(0, 8)); // max 8
  };

  return { recent, addRecent, isMounted };
};
