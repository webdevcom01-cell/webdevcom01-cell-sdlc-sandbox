import { describe, it, expect } from 'vitest';
import { PipelineManager, handlePipelineError, PipelineNode, PipelineContext } from './pipeline-manager';

describe('handlePipelineError', () => {
  it('returns error message from string', () => {
    const result = handlePipelineError('Something went wrong');
    expect(result).toEqual({ success: false, error: 'Something went wrong' });
  });
  it('returns error message from Error object', () => {
    const err = new Error('Failure');
    const result = handlePipelineError(err);
    expect(result).toEqual({ success: false, error: 'Failure' });
  });
  it('returns default message for unknown input', () => {
    const result = handlePipelineError(42);
    expect(result).toEqual({ success: false, error: 'Pipeline operation failed.' });
  });
  it('can include context (no-op)', () => {
    const result = handlePipelineError('msg', { foo: 'bar' });
    expect(result).toEqual({ success: false, error: 'msg' });
  });
  it('handles null error', () => {
    const result = handlePipelineError(null);
    expect(result).toEqual({ success: false, error: 'Pipeline operation failed.' });
  });
});

describe('PipelineManager', () => {
  it('executes set_variable node', async () => {
    const nodes: PipelineNode[] = [
      { id: 'n1', type: 'set_variable', data: { key: 'x', value: 42 } }
    ];
    const mgr = new PipelineManager(nodes);
    const result = await mgr.execute({ variables: {} });
    expect(result).toEqual({ success: true, data: { x: 42 } });
  });
  it('returns error on unknown node type', async () => {
    const nodes: PipelineNode[] = [
      { id: 'n1', type: 'unknown_type' }
    ];
    const mgr = new PipelineManager(nodes);
    const result = await mgr.execute({ variables: {} });
    expect(result.success).toBe(false);
    expect(typeof result.error).toBe('string');
  });
  it('updates context for multiple nodes', async () => {
    const nodes: PipelineNode[] = [
      { id: 'a', type: 'set_variable', data: { key: 'x', value: 1 } },
      { id: 'b', type: 'set_variable', data: { key: 'y', value: 2 } }
    ];
    const mgr = new PipelineManager(nodes);
    const result = await mgr.execute({ variables: { z: 3 } });
    expect(result).toEqual({ success: true, data: { z: 3, x: 1, y: 2 } });
  });
  it('handles empty pipeline', async () => {
    const mgr = new PipelineManager([]);
    const result = await mgr.execute({ variables: { a: 1 } });
    expect(result).toEqual({ success: true, data: { a: 1 } });
  });
  it('handles node with missing data', async () => {
    const nodes: PipelineNode[] = [
      { id: 'n1', type: 'set_variable' }
    ];
    const mgr = new PipelineManager(nodes);
    const result = await mgr.execute({ variables: {} });
    expect(result.success).toBe(false);
    expect(typeof result.error).toBe('string');
  });
});
