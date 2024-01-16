const axios = require('axios')
const { testCases } = require('./data/testJson')
const { describe, expect, it } = require('@jest/globals')

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/'

describe('Tests', () => {
    for (const testCase of testCases) {
        it(testCase.name, async () => {
            const response = await axios.post(ENDPOINT, testCase.reqObject)
            if (typeof response.data.output === 'object') {
                expect(response.data.output.score).toEqual(testCase.expectedResponse.val.score)
                expect(response.data.output.rationale).toBeDefined()
            } else {
                expect(response).toHaveProperty('data.output', testCase.expectedResponse.val)
            }
            expect(response).toHaveProperty('status', testCase.expectedResponse.status)
            expect(response).toHaveProperty('data.error', testCase.expectedResponse.error)
        }, 15000)
    }
})
