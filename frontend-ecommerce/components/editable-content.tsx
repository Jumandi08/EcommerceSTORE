"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Save, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";

interface EditableTextProps {
  initialValue: string;
  onSave: (value: string) => Promise<void>;
  isAdmin: boolean;
  className?: string;
  multiline?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function EditableText({
  initialValue,
  onSave,
  isAdmin,
  className = '',
  multiline = false,
  as = 'p'
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    if (value.trim() === initialValue.trim()) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(value);
      toast({
        title: "Cambios guardados",
        description: "El contenido se actualizó correctamente.",
      });
      setIsEditing(false);
    } catch (_error) {
      toast({
        title: "Error",
        description: "No se pudo guardar los cambios.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };

  const Component = as;

  if (!isAdmin) {
    return <Component className={className}>{value}</Component>;
  }

  return (
    <div className="group relative">
      {!isEditing ? (
        <>
          <Component className={className}>{value}</Component>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 shadow-lg"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="w-3 h-3" />
            </Button>
          </motion.div>
        </>
      ) : (
        <div className="space-y-2">
          {multiline ? (
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="min-h-[100px] border-2 border-primary"
              autoFocus
            />
          ) : (
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border-2 border-primary"
              autoFocus
            />
          )}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface EditableSectionProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (id: string, data: any) => Promise<void>;
  isAdmin: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (data: any, createEditableText: (fieldPath: string, options?: Partial<EditableTextProps>) => React.ReactNode) => React.ReactNode;
}

export function EditableSection({
  id,
  initialData,
  onSave,
  isAdmin,
  children
}: EditableSectionProps) {
  const [data, setData] = useState(initialData);

  const handleFieldSave = async (fieldPath: string, value: string) => {
    const newData = { ...data };
    const keys = fieldPath.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setData(newData);
    await onSave(id, newData);
  };

  const createEditableText = (fieldPath: string, options: Partial<EditableTextProps> = {}) => {
    const keys = fieldPath.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = data;

    for (const key of keys) {
      value = value?.[key];
    }

    return (
      <EditableText
        initialValue={value || ''}
        onSave={(newValue) => handleFieldSave(fieldPath, newValue)}
        isAdmin={isAdmin}
        {...options}
      />
    );
  };

  return <>{children(data, createEditableText)}</>;
}

interface AdminToolbarProps {
  isAdmin: boolean;
  onSaveAll?: () => Promise<void>;
}

export function AdminToolbar({ isAdmin, onSaveAll }: AdminToolbarProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  if (!isAdmin) return null;

  const handleSaveAll = async () => {
    if (!onSaveAll) return;

    setIsSaving(true);
    try {
      await onSaveAll();
      toast({
        title: "Todos los cambios guardados",
        description: "El contenido se actualizó correctamente.",
      });
    } catch (error) {
      console.error('Error saving all content:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar todos los cambios.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-3">
          <Edit2 className="w-5 h-5" />
          <span className="font-semibold">Modo Administrador Activo</span>
          {onSaveAll && (
            <Button
              size="sm"
              variant="secondary"
              onClick={handleSaveAll}
              disabled={isSaving}
              className="ml-2"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Todo
                </>
              )}
            </Button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
