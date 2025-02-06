#!/usr/bin/env node
import { Command } from 'commander';
import { generateTableRoutes } from '../utils/routeGenerator';
import { TableConfig } from '../types';

// Initialize a new Command instance for CLI
const program = new Command();
    
// Set basic CLI information
program
  .version('1.0.0')
  .description('CLI for scheduling system components');

// Define the generate-routes command
program
  .command('generate-routes')
  .description('Generate routes from table configuration')
  .argument('<config>', 'Path to config file')
  .action(async (configPath: string) => {
    try {
      // Load and parse the configuration file
      const config: TableConfig = require(configPath);
      // Generate routes based on the configuration
      await generateTableRoutes(config);
      console.log('Routes generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse(); 