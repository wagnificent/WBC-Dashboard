/**
 * Personal Access Token Test Script
 * Tests the Airtable PAT to diagnose authentication issues
 */

const axios = require('axios');

async function testPAT() {
    console.log('🔍 Testing Personal Access Token...');
    console.log('📋 Base ID: app86GkUbhT7U1D6p');
    console.log('🔑 Testing access to Teams table...');

    try {
        const response = await axios.get('https://api.airtable.com/v0/app86GkUbhT7U1D6p/Teams', {
            headers: {
                'Authorization': 'Bearer patrf8MP899xKagvm.5882de4986cb406aaadea5d127c5152ccaa8757991f1b12674e3ab0a96588301',
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ SUCCESS: PAT works!');
        console.log('📊 Response status:', response.status);
        console.log('📦 Records found:', response.data.records ? response.data.records.length : 0);

        if (response.data.records && response.data.records.length > 0) {
            console.log('📋 First record:', response.data.records[0].fields);
        }

        return { success: true, data: response.data };

    } catch (error) {
        console.log('❌ ERROR: PAT test failed');
        console.log('📊 Error status:', error.response ? error.response.status : 'Unknown');

        if (error.response) {
            console.log('📋 Error details:', error.response.data);
        } else {
            console.log('📋 Error message:', error.message);
        }

        // Provide specific guidance based on error type
        if (error.response) {
            switch (error.response.status) {
                case 403:
                    console.log('🔍 DIAGNOSIS: 403 Forbidden');
                    console.log('💡 POSSIBLE CAUSES:');
                    console.log('  1. PAT missing required scopes');
                    console.log('  2. Base not shared with your account');
                    console.log('  3. PAT revoked or expired');
                    console.log('📋 RECOMMENDED ACTIONS:');
                    console.log('  1. Check PAT scopes in Airtable settings');
                    console.log('  2. Verify base sharing settings');
                    console.log('  3. Regenerate PAT if needed');
                    break;
                case 404:
                    console.log('🔍 DIAGNOSIS: 404 Not Found');
                    console.log('💡 POSSIBLE CAUSES:');
                    console.log('  1. Incorrect Base ID');
                    console.log('  2. Table name is wrong');
                    console.log('📋 RECOMMENDED ACTIONS:');
                    console.log('  1. Double-check Base ID in Airtable');
                    console.log('  2. Verify table exists in the base');
                    break;
                case 401:
                    console.log('🔍 DIAGNOSIS: 401 Unauthorized');
                    console.log('💡 POSSIBLE CAUSES:');
                    console.log('  1. Invalid PAT');
                    console.log('  2. PAT expired');
                    console.log('📋 RECOMMENDED ACTIONS:');
                    console.log('  1. Regenerate PAT in Airtable');
                    console.log('  2. Update PAT in config');
                    break;
                case 429:
                    console.log('🔍 DIAGNOSIS: 429 Too Many Requests');
                    console.log('💡 POSSIBLE CAUSES:');
                    console.log('  1. API rate limit exceeded');
                    console.log('📋 RECOMMENDED ACTIONS:');
                    console.log('  1. Wait and try again later');
                    console.log('  2. Check Airtable API rate limits');
                    break;
                default:
                    console.log('🔍 DIAGNOSIS: Unknown error');
                    console.log('📋 RECOMMENDED ACTIONS:');
                    console.log('  1. Check Airtable status page');
                    console.log('  2. Contact Airtable support');
            }
        }

        return { success: false, error: error.message };
    }
}

// Run the test
testPAT().then(result => {
    if (result.success) {
        console.log('🎉 PAT is working correctly!');
        console.log('🚀 Ready to run full setup!');
    } else {
        console.log('❌ PAT test completed with errors');
        console.log('📋 Please check the recommendations above');
    }
}).catch(error => {
    console.log('❌ Unexpected error:', error);
});
