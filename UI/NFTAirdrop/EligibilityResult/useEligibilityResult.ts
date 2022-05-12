export const useEligibilityResult = () => {
  return {
    status: 'eligible',
  } as {
    status: 'eligible' | 'loading' | 'notEligible'
  }
}
