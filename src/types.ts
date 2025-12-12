export type SystemTypes = 'Application' | 'Service' | 'Database' | 'Integration';

export interface PrivacyDeclaration {
  data_categories: string[];
  data_subjects: string[];
  data_use: string;
  name: string;
}
export interface System {
  description: string;
  fides_key: string;
  name: string;
  privacy_declarations: PrivacyDeclaration[];
  system_dependencies: string[];
  system_type: SystemTypes;
}

export interface FilterOption {
  label: string;
  value: string;
}

export type SystemsByType = Partial<Record<Lowercase<SystemTypes>, System[]>>;
