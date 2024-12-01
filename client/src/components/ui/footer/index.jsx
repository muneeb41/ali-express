import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-8">
    <div className="pb-7 max-w-7xl mx-auto px-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* Help Section */}
      <div>
        <h4 className="font-bold mb-4">Help</h4>
        <p className="text-sm text-gray-600">
          <a href="#" className="text-orange-500 hover:underline">
            Help Center
          </a>
          , Disputes & Reports, Buyer Protection, Report IPR infringement,
          Regulated Information, Integrity Compliance, Transparency Center,
          Submit report (non-registered users)
        </p>
      </div>

      {/* Browse by Category */}
      <div>
        <h4 className="font-bold mb-4">Browse by Category</h4>
        <p className="text-sm text-gray-600">
          All Popular, Product, Promotion, Low Price, Great Value, Reviews
        </p>
      </div>

      {/* AliExpress Multi-Language Sites */}
      <div>
        <h4 className="font-bold mb-4">AliExpress Multi-Language Sites</h4>
        <p className="text-sm text-gray-600">
          Russian, Portuguese, Spanish, French, German, Italian, Dutch,
          Turkish, Japanese, Korean, Thai, Vietnamese, Arabic, Hebrew, Polish
        </p>
      </div>

      {/* Alibaba Group */}
      <div>
        <h4 className="font-bold mb-4">Alibaba Group</h4>
        <p className="text-sm text-gray-600">
          Alibaba Group Website, AliExpress, Alimama, Alipay, Fliggy, Alibaba
          Cloud, Alibaba International, AliTelecom, DingTalk, Juhuasuan,
          Taobao Marketplace, Tmall, Taobao Global, AliOS, 1688
        </p>
      </div>
    </div>
    <div className='bg-black text-white py-3 px-5 font-extralight  sm:px-16 lg:px-40 '>
         <p>
         Intellectual Property Protection - Privacy Policy - Sitemap - Terms of Use - Information for EU consumers - Imprint - Transaction Services Agreement for non-EU/UK Consumers - Terms and Conditions for EU/EEA/UK Consumers - User Information Legal Enquiry Guide ©️2010-2024 AliExpress.com. All rights reserved. 增值电信业务经营许可证 增值电信业务经营许可证 浙B2-20120091-8 浙公网安备 浙公网安备 33010802002248号
         </p>
    </div>
  </footer>
);
}

export default Footer