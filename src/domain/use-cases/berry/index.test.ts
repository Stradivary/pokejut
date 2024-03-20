
import { describe, expect, it } from 'vitest';
import { getBerryGain, berriesGain } from './index';

describe('getBerryGain', () => {
    it('returns the correct gain for each firmness', () => {
        for (const firmness in berriesGain) {
            expect(getBerryGain(firmness)).toEqual(berriesGain[firmness]);
        }
    });

    it('returns 1 when firmness is undefined', () => {
        expect(getBerryGain(undefined)).toEqual(1);
    });

    it('returns 1 when firmness is not in the berriesGain record', () => {
        expect(getBerryGain('non-existent-firmness')).toEqual(1);
    });
});