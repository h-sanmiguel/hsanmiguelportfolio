import { ArrowLeft, Award, ExternalLink, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const CertificationsPage = () => {
  const navigate = useNavigate()
  const [selectedCert, setSelectedCert] = useState<number | null>(null)

  const certifications = [
    {
      title: 'IT Essentials',
      issuer: 'Cisco Networking Academy',
      date: '2026',
      file: '/certifications/IT_Essentials_certificate_hsanmiguel-gbox-adnu-edu-ph_fe33530e-ffbb-4ec2-a0d6-f9252cdd8348.pdf',
    },
    {
      title: 'BS Information Technology',
      issuer: 'Ateneo de Naga University',
      date: '2023 - Present',
      file: null,
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-10 text-black dark:text-white">
          Certifications & Education
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg p-6 transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-3 mb-4">
                <Award size={28} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-black dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                {cert.date}
              </p>

              {cert.file && (
                <button
                  onClick={() => setSelectedCert(index)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <ExternalLink size={16} />
                  Show Certificate
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCert !== null && certifications[selectedCert].file && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCert(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-800 p-4">
              <h2 className="text-lg font-bold text-black dark:text-white">
                {certifications[selectedCert].title}
              </h2>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body - Certificate Only */}
            <div className="flex-1 overflow-auto p-4">
              <iframe
                src={`${certifications[selectedCert].file!}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full min-h-[500px] rounded"
                title={certifications[selectedCert].title}
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
