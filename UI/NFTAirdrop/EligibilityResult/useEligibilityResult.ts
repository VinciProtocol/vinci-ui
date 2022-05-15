export const useEligibilityResult = () => {
  return {
    status: 'notEligible',
  } as {
    status: 'eligible' | 'loading' | 'notEligible'
  }
}
