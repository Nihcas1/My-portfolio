export interface CertificateItem {
  file: string;
  title: string;
  issuer: string;
  date: string;
  credlyUrl?: string;
}

export const certificates: CertificateItem[] = [
  {
    file: '/certificates/gcp-pmle.png',
    title: 'Professional Machine Learning Engineer (PMLE)',
    issuer: 'Google Cloud Platform (GCP)',
    date: '2025-02-01',
    credlyUrl:
      'https://www.credly.com/badges/57922f23-cdff-4c62-bd5f-c3b3dce27bf7/public_url',
  },
  {
    file: '/certificates/claude-ccaf.png',
    title: 'Claude Code Architect Foundation (CCAF)',
    issuer: 'Anthropic Claude',
    date: '2025-01-15',
    credlyUrl:
      'https://www.credly.com/badges/cc439636-e924-4739-b580-d88f6c793fda/public_url',
  },
  {
    file: '/certificates/gcp-ace.png',
    title: 'Associate Cloud Engineer (ACE)',
    issuer: 'Google Cloud Platform (GCP)',
    date: '2024-01-01',
    credlyUrl:
      'https://www.credly.com/badges/8ba6791a-9a4c-4105-9c7d-29f39f62ff78/public_url',
  },
  {
    file: '/certificates/aws-clf.png',
    title: 'AWS Certified Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services',
    date: '2023-08-01',
  },
];

const achievementsConfig = {
  certificates,
};

export default achievementsConfig;
