import { Attribute } from "../interfaces/types";
import { dataTypeProperties } from "../constants/dataTypeProperties";

export const needsSizeValidation = (dataType: string): boolean => {
  const type = dataType.toLowerCase();
  return dataTypeProperties[type]?.needsSize ?? false;
};

export const needsPrecision = (dataType: string): boolean => {
  const type = dataType.toLowerCase();
  return dataTypeProperties[type]?.needsPrecision ?? false;
};

export const getNumericTypeCategory = (dataType: string): 'integer' | 'decimal' | 'floating' | null => {
  const type = dataType.toLowerCase();
  if (['smallint', 'integer', 'bigint'].includes(type)) {
    return 'integer';
  }
  if (['decimal', 'numeric'].includes(type)) {
    return 'decimal';
  }
  if (['real', 'double precision'].includes(type)) {
    return 'floating';
  }
  return null;
};

export const isPrimaryKeyExists = (attributes: Attribute[], editingIndex: number | null): boolean => {
  return attributes.some((attr, idx) => {
    if (editingIndex !== null && idx === editingIndex) return false;
    return attr.constraints.includes('primary key');
  });
};

export const hasPrimaryKey = (attrs: Attribute[]): boolean => {
  return attrs.some(attr => 
    Array.isArray(attr.constraints) && 
    attr.constraints.includes('PRIMARY KEY')
  );
}; 