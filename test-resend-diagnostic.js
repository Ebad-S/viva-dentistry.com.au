/**
 * Comprehensive Resend API Diagnostic Tool
 * Tests all aspects of Resend integration
 * to run this script, use: node test-resend-diagnostic.js
 */

const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

// Read .env file manually
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const apiKey = envContent.match(/RESEND_API_KEY=(.+)/)?.[1]?.trim();

if (!apiKey) {
  console.error('❌ RESEND_API_KEY not found in .env file');
  process.exit(1);
}

console.log('🔑 API Key found:', apiKey.substring(0, 10) + '...' + apiKey.slice(-4));
console.log('📧 Starting Resend API diagnostic...\n');
console.log('='.repeat(60));

const resend = new Resend(apiKey);

// Test 1: List all templates
async function test1_listTemplates() {
  console.log('\n📋 TEST 1: List All Templates');
  console.log('-'.repeat(60));
  
  try {
    const response = await resend.templates.list();
    console.log('✅ API call successful');
    console.log('📊 Response:', JSON.stringify(response, null, 2));
    
    if (response.data && response.data.data) {
      const templates = response.data.data;
      console.log(`\n✅ Found ${templates.length} template(s):`);
      
      templates.forEach((template, index) => {
        console.log(`\n${index + 1}. ${template.name || 'Unnamed'}`);
        console.log(`   ID: ${template.id}`);
        console.log(`   Created: ${template.created_at}`);
        console.log(`   Updated: ${template.updated_at || 'N/A'}`);
      });
      
      return templates;
    } else {
      console.log('⚠️  No templates found in response');
      return [];
    }
  } catch (error) {
    console.error('❌ Error listing templates:', error.message);
    console.error('Full error:', error);
    return [];
  }
}

// Test 2: Get specific template details
async function test2_getTemplate(templateId) {
  console.log('\n📄 TEST 2: Get Template Details');
  console.log('-'.repeat(60));
  console.log(`Template ID: ${templateId}`);
  
  try {
    const template = await resend.templates.get(templateId);
    console.log('✅ Template retrieved successfully');
    console.log('📊 Template details:', JSON.stringify(template, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Error getting template:', error.message);
    console.error('Full error:', error);
    return false;
  }
}

// Test 3: Send test email with template
async function test3_sendTestEmail(templateId, templateName) {
  console.log('\n📨 TEST 3: Send Test Email with Template');
  console.log('-'.repeat(60));
  console.log(`Template ID: ${templateId}`);
  console.log(`Template Name: ${templateName}`);
  
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // Using Resend's test domain
      to: 'delivered@resend.dev', // Resend's test inbox
      subject: `Test Email - ${templateName}`,
      template: {
        id: templateId,
        variables: {
          name: 'Test User',
          email: 'test@example.com',
          phone: '(02) 9586 0877',
          message: 'This is a test message'
        }
      }
    });
    
    console.log('✅ Email sent successfully!');
    console.log('📊 Response:', JSON.stringify(result, null, 2));
    
    if (result.error) {
      console.error('⚠️  Email has error:', result.error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.error('Full error:', error);
    return false;
  }
}

// Test 4: Send simple email (no template)
async function test4_sendSimpleEmail() {
  console.log('\n📨 TEST 4: Send Simple Email (No Template)');
  console.log('-'.repeat(60));
  
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'Test Email - No Template',
      html: '<h1>Hello World</h1><p>This is a test email without a template.</p>'
    });
    
    console.log('✅ Simple email sent successfully!');
    console.log('📊 Response:', JSON.stringify(result, null, 2));
    
    if (result.error) {
      console.error('⚠️  Email has error:', result.error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error sending simple email:', error.message);
    console.error('Full error:', error);
    return false;
  }
}

// Main diagnostic flow
async function runDiagnostics() {
  console.log('\n🏁 STARTING COMPREHENSIVE DIAGNOSTIC\n');
  
  const results = {
    listTemplates: false,
    getTemplate: false,
    sendWithTemplate: false,
    sendSimple: false
  };
  
  // Test 1: List templates
  const templates = await test1_listTemplates();
  results.listTemplates = templates.length > 0;
  
  // Test 2 & 3: If templates found, test them
  if (templates.length > 0) {
    const firstTemplate = templates[0];
    results.getTemplate = await test2_getTemplate(firstTemplate.id);
    results.sendWithTemplate = await test3_sendTestEmail(firstTemplate.id, firstTemplate.name);
  } else {
    console.log('\n⚠️  Skipping template tests - no templates found');
  }
  
  // Test 4: Send simple email (always test)
  results.sendSimple = await test4_sendSimpleEmail();
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 DIAGNOSTIC SUMMARY');
  console.log('='.repeat(60));
  console.log(`List Templates:        ${results.listTemplates ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Get Template Details:  ${results.getTemplate ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Send with Template:    ${results.sendWithTemplate ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Send Simple Email:     ${results.sendSimple ? '✅ PASS' : '❌ FAIL'}`);
  console.log('='.repeat(60));
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  
  if (!results.listTemplates) {
    console.log('❌ Cannot list templates - Check:');
    console.log('   1. API key is correct and active');
    console.log('   2. API key has correct permissions');
    console.log('   3. Templates exist in the same account');
  }
  
  if (results.listTemplates && !results.sendWithTemplate) {
    console.log('❌ Can list templates but cannot send - Check:');
    console.log('   1. Templates are published');
    console.log('   2. Template variables match');
    console.log('   3. Domain is verified in Resend');
  }
  
  if (!results.sendSimple) {
    console.log('❌ Cannot send ANY emails - Check:');
    console.log('   1. API key has email sending permissions');
    console.log('   2. Account is not suspended');
    console.log('   3. Domain verification status');
  }
  
  if (results.listTemplates && results.sendWithTemplate && results.sendSimple) {
    console.log('✅ All tests passed! Resend is working correctly.');
    console.log('   The issue might be in your Next.js code or environment.');
  }
  
  console.log('\n🏁 Diagnostic complete!\n');
}

// Run diagnostics
runDiagnostics().catch(error => {
  console.error('\n💥 Fatal error during diagnostics:', error);
  process.exit(1);
});
