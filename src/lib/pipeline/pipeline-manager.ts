export interface PipelineContext {
  variables: Record<string, unknown>;
}

export interface PipelineNode {
  id: string;
  type: string;
  data?: Record<string, unknown>;
}

export interface PipelineResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

/**
 * Helper function for consistent error handling in pipeline operations.
 * @param error - Error object or string
 * @param context - Optional extra info for logging
 * @returns PipelineResult with success: false and error message
 */
export function handlePipelineError(error: unknown, context?: Record<string, unknown>): PipelineResult {
  let message = 'Pipeline operation failed.';
  if (typeof error === 'string') message = error;
  else if (error instanceof Error) message = error.message;
  // Here you would log the error with context if a logger was available
  // logger.error('Pipeline error', { error, ...context });
  return { success: false, error: message };
}

/**
 * Manages execution of a pipeline of nodes with provided context.
 */
export class PipelineManager {
  /**
   * Create a PipelineManager.
   * @param nodes - Array of pipeline nodes
   */
  constructor(private nodes: PipelineNode[]) {}

  /**
   * Executes the pipeline starting from the first node, updating context as it proceeds.
   * Returns the final PipelineResult.
   * @param context - Initial pipeline context
   */
  async execute(context: PipelineContext): Promise<PipelineResult> {
    let currentContext = { ...context };
    try {
      for (const node of this.nodes) {
        const result = await this.executeNode(node, currentContext);
        if (!result.success) return result;
        currentContext = {
          ...currentContext,
          variables: {
            ...currentContext.variables,
            ...(typeof result.data === 'object' && result.data !== null ? result.data : {})
          }
        };
      }
      return { success: true, data: currentContext.variables };
    } catch (error) {
      return handlePipelineError(error);
    }
  }

  /**
   * Executes a single pipeline node. Override to implement node-specific logic.
   * @param node - Pipeline node to execute
   * @param context - Current pipeline context
   */
  async executeNode(node: PipelineNode, context: PipelineContext): Promise<PipelineResult> {
    try {
      // Example logic: set a variable based on node data
      if (node.type === 'set_variable' && node.data && typeof node.data.key === 'string') {
        const key = node.data.key;
        const value = node.data.value;
        return {
          success: true,
          data: { [key]: value }
        };
      }
      // Unknown node type
      return handlePipelineError(`Unknown node type: ${node.type}`, { node });
    } catch (error) {
      return handlePipelineError(error, { node });
    }
  }
}
