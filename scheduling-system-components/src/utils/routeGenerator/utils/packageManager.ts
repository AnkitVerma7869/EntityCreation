import { Entity, Attribute } from '../../../interfaces/types';

interface PackageConfig {
  name: string;
  version: string;
  isRequired: boolean;
  dependencies?: string[];
}

function getFieldSpecificPackages(attributes: Attribute[]): PackageConfig[] {
  const packages: PackageConfig[] = [];

  attributes.forEach(attr => {
    switch (attr.inputType.toLowerCase() || attr.dataType.toLowerCase()) {
      case 'date':
        packages.push({
          name: 'flatpickr',
          version: '^4.6.13',
          isRequired: true
        });
        packages.push({
          name: '@types/flatpickr',
          version: '^3.1.2',
          isRequired: true
        });
        break;
      case 'rich-text':
        packages.push({
          name: '@tinymce/tinymce-react',
          version: '^4.0.0',
          isRequired: true
        });
        break;
      case 'file':
        packages.push({
          name: '@mui/material-dropzone',
          version: '^5.0.0',
          isRequired: true
        });
        break;
      case 'phone':
        packages.push({
          name: 'react-phone-input-2',
          version: '^2.15.1',
          isRequired: true
        });
        break;
      case 'select':
      case 'multiselect':
        packages.push({
          name: '@mui/material',
          version: '^5.14.0',
          isRequired: true
        });
        break;
    }

    // Add validation specific packages
    if (attr.validations) {
      if (attr.validations.required || attr.validations.pattern || attr.validations.min || attr.validations.max) {
        packages.push({
          name: 'yup',
          version: '^1.3.2',
          isRequired: true
        });
        packages.push({
          name: '@hookform/resolvers',
          version: '^3.3.2',
          isRequired: true
        });
      }
    }
  });

  return packages;
}

export function generatePackageImports(config: Entity) {
  const basePackages: Record<string, PackageConfig> = {
    // Core packages
    'react': {
      name: 'react',
      version: '^18.0.0',
      isRequired: true
    },
    'react-dom': {
      name: 'react-dom',
      version: '^18.0.0',
      isRequired: true
    },
    'next': {
      name: 'next',
      version: '^13.0.0',
      isRequired: true
    },

    // UI Components
    '@mui/material': {
      name: '@mui/material',
      version: '^5.14.0',
      isRequired: true
    },
    '@emotion/react': {
      name: '@emotion/react',
      version: '^11.11.0',
      isRequired: true
    },
    '@emotion/styled': {
      name: '@emotion/styled',
      version: '^11.11.0',
      isRequired: true
    },
    '@mui/icons-material': {
      name: '@mui/icons-material',
      version: '^5.14.0',
      isRequired: true
    },

    // Form Management
    'react-hook-form': {
      name: 'react-hook-form',
      version: '^7.48.0',
      isRequired: config.attributes.length > 0
    },

    // State Management
    'zustand': {
      name: 'zustand',
      version: '^4.4.0',
      isRequired: true
    }
  };

  // Get field-specific packages
  const fieldPackages = getFieldSpecificPackages(config.attributes);

  // Merge base packages with field-specific packages and their dependencies
  fieldPackages.forEach(pkg => {
    if (!basePackages[pkg.name]) {
      basePackages[pkg.name] = pkg;
    }
    // Add dependencies if they exist
    if (pkg.dependencies) {
      pkg.dependencies.forEach(dep => {
        if (!basePackages[dep]) {
          basePackages[dep] = {
            name: dep,
            version: pkg.version,
            isRequired: true
          };
        }
      });
    }
  });

  return {
    packages: Object.values(basePackages).filter(pkg => pkg.isRequired),
    devPackages: [
      {
        name: '@types/react',
        version: '^18.0.0',
        isRequired: true
      },
      {
        name: '@types/node',
        version: '^18.0.0',
        isRequired: true
      },
      {
        name: 'typescript',
        version: '^5.0.0',
        isRequired: true
      }
    ]
  };
} 