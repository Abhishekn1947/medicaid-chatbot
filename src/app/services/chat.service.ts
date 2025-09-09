// src/app/services/chat.service.ts
// TEMPLATE NOTICE: This file contains SAMPLE healthcare conversation data
// Replace the knowledge base and processMessage logic with your AI service integration
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  actions?: ChatAction[];
  showEscalation?: boolean;
  tags?: string[];
}

export interface ChatAction {
  id: string;
  label: string;
  type: 'link' | 'action' | 'escalate';
  data?: any;
}

// SAMPLE DATA INTERFACE - Replace with your own data structure
export interface SampleQA {
  keywords: string[];
  response: string;
  actions?: ChatAction[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  // SAMPLE KNOWLEDGE BASE - Replace this entire object with your AI service integration
  private sampleKnowledgeBase: { [key: string]: SampleQA } = {
    eligibility: {
      keywords: ['eligible', 'eligibility', 'qualify', 'qualifications', 'requirements'],
      response: 'I can help you determine if you\'re likely to be eligible for Medicaid. Please provide me with the following information for yourself and everyone in your household who needs coverage:<br>• Household size<br>• Total monthly income<br>• Age<br>• Pregnancy status, if applicable<br>• Disability status, if applicable',
      actions: [
        { id: 'income_limits', label: 'View Income Limits', type: 'action' as const, data: { topic: 'income_limits' } },
        { id: 'apply_process', label: 'How to Apply', type: 'action' as const, data: { topic: 'apply_process' } },
        { id: 'check_status', label: 'Check Application Status', type: 'action' as const, data: { topic: 'check_status' } }
      ]
    },
    income_limits: {
      keywords: ['income', 'limit', 'poverty', 'fpl', 'earn', 'salary', 'wages'],
      response: 'Medicaid eligibility in Maryland is based on a percentage of the Federal Poverty Level (FPL). For most adults, the income limit is 138% of the FPL. This number changes based on your household size. For example, the 2025 monthly income limits are approximately:<br>• 1-person household: up to $1,801<br>• 2-person household: up to $2,433<br>• 3-person household: up to $3,065<br>• 4-person household: up to $3,698<br><br><strong>Note:</strong> These amounts are for the MAGI category and can vary. The best way to know for sure is to apply. Income limits for children, pregnant individuals, and people with disabilities are different.'
    },
    apply_process: {
      keywords: ['apply', 'application', 'enroll', 'enrollment', 'sign up'],
      response: 'You can apply for Medicaid in Maryland at any time, as there\'s no open enrollment period. The fastest and easiest way to apply is online through Maryland Health Connection at marylandhealthconnection.gov. You can also:<br>• Apply by phone at 1-855-642-8572<br>• Get free, in-person help from a certified navigator',
      actions: [
        { id: 'documents_needed', label: 'Documents Needed', type: 'action' as const, data: { topic: 'documents_needed' } },
        { id: 'decision_time', label: 'Decision Timeline', type: 'action' as const, data: { topic: 'decision_time' } }
      ]
    },
    apply_process_spanish: {
      keywords: ['como solicito', 'solicitar', 'aplicar', 'maryland', 'medicaid en maryland'],
      response: 'Puede solicitar Medicaid en Maryland en cualquier momento, ya que no hay período de inscripción abierta. La forma más rápida y sencilla de solicitarlo es en línea a través de Maryland Health Connection en marylandhealthconnection.gov. También puede:<br>• Solicitar por teléfono al 1-855-642-8572<br>• Recibir ayuda gratuita en persona de un asesor certificado.',
      actions: [
        { id: 'documents_needed', label: 'Documentos Necesarios', type: 'action' as const, data: { topic: 'documents_needed' } },
        { id: 'decision_time', label: 'Tiempo de Decisión', type: 'action' as const, data: { topic: 'decision_time' } }
      ]
    },
    documents_needed: {
      keywords: ['documents', 'paperwork', 'proof', 'identification', 'forms'],
      response: 'To complete your application, you\'ll need information for everyone in your household. This includes:<br>• <strong>Proof of identity:</strong> Birthdates, Social Security Numbers, or documentation for legal immigrants<br>• <strong>Income information:</strong> Recent pay stubs or W-2 forms<br>• <strong>Citizenship or immigration status</strong> documentation<br>• <strong>Tax returns</strong> from previous years'
    },
    decision_time: {
      keywords: ['decision', 'timeline', 'how long', 'wait', 'processing'],
      response: 'If you apply online and all of your information can be verified through federal and state databases, you may get an immediate eligibility determination. If we need to request additional documents, the process can take up to 45 days. If you\'re approved, you will receive a red and white Medicaid card in the mail.'
    },
    children_eligibility: {
      keywords: ['children', 'kids', 'child', 'mchp', 'family'],
      response: 'Yes. Your children may qualify for Medicaid or the Maryland Children\'s Health Program (MCHP) even if you don\'t. Children\'s coverage has higher income limits. MCHP has two tiers: a no-cost plan for household income up to 211% of the FPL, and a low-cost premium plan for household income up to 322% of the FPL.'
    },
    pregnancy: {
      keywords: ['pregnant', 'pregnancy', 'prenatal', 'expecting', 'maternity'],
      response: 'Pregnant individuals in Maryland may qualify for Medicaid at higher income levels—up to 264% FPL. Coverage includes prenatal, delivery, and postpartum care for 12 months after birth. It\'s also important to note that Maryland provides this coverage regardless of a pregnant individual\'s immigration status.'
    },
    new_resident: {
      keywords: ['moved', 'new resident', 'relocated', 'just moved'],
      response: 'Yes. As long as you are a Maryland resident and meet the other eligibility requirements, you can apply immediately. You\'ll need proof of residency, such as a lease, utility bill, or Maryland ID.'
    },
    citizenship: {
      keywords: ['citizen', 'citizenship', 'immigration', 'immigrant', 'legal status'],
      response: 'Medicaid is available to U.S. citizens and certain lawfully present immigrants. Some immigration statuses may be eligible for Emergency Medicaid for urgent medical needs.'
    },
    disability: {
      keywords: ['disability', 'disabled', 'social security', 'ssi', 'ssdi'],
      response: 'If you meet Social Security\'s definition of disability, you may qualify for Medicaid regardless of your income. There are also special programs for working individuals with disabilities.'
    },
    other_insurance: {
      keywords: ['private insurance', 'other insurance', 'employer insurance', 'secondary'],
      response: 'Yes, you can have Medicaid and other health insurance. Medicaid may act as a secondary payer, covering costs your primary insurance does not. You will need to provide details of your other insurance during the application process to coordinate your benefits.'
    },
    coverage_start: {
      keywords: ['when does coverage start', 'effective date', 'start date'],
      response: 'Coverage typically starts on the first day of the month you applied. Some applicants may qualify for retroactive coverage up to 3 months before the application date.'
    },
    renewal: {
      keywords: ['renew', 'renewal', 'reapply', 'redetermination'],
      response: 'Medicaid coverage must be renewed every year. Maryland uses an automated renewal process (ex parte renewals). If we can\'t confirm your eligibility electronically, you will receive a renewal form in the mail or online with instructions on how to renew.'
    },
    missed_renewal: {
      keywords: ['missed renewal', 'deadline', 'expired', 'lapse'],
      response: 'If you miss your renewal deadline, your coverage may end. You can reapply at any time, but you might have a gap in coverage. If you reapply within 90 days, your eligibility may be backdated to the end of your last coverage period.'
    },
    check_status: {
      keywords: ['check status', 'application status', 'pending'],
      response: 'Yes. I can securely connect to the Maryland Health Connection system to check your application status, with your permission.',
      actions: [
        { id: 'escalate_status', label: 'Connect to Check Status', type: 'escalate' as const, data: { reason: 'status_check' } }
      ]
    },
    income_change: {
      keywords: ['income change', 'job change', 'pay raise', 'household change'],
      response: 'You must report changes in your income or household size within 30 days through Maryland Health Connection. A change in income could affect your eligibility, and you might be moved to a different program or qualify for subsidies in the marketplace.'
    },
    cost: {
      keywords: ['cost', 'premium', 'pay', 'copay', 'free'],
      response: 'Most Medicaid enrollees do not have to pay premiums. Some programs may have small co-pays for certain services.'
    },
    out_of_state: {
      keywords: ['other state', 'travel', 'vacation', 'out of state'],
      response: 'Medicaid is state-specific, but it will cover emergency care in another state. Non-emergency care outside Maryland may not be covered. You should report your change of address to Maryland Health Connection as soon as possible to avoid a lapse in coverage.'
    },
    dental_vision: {
      keywords: ['dental', 'dentist', 'teeth', 'vision', 'glasses', 'eye'],
      response: 'Maryland Medicaid covers certain dental services for children and adults through the Maryland Healthy Smiles Dental Program. Vision services, such as exams and glasses, are also covered for children. Coverage for adults can be more limited, depending on your specific plan.<br><br><strong>For Children:</strong> The program covers a wide range of services, including regular checkups, cleanings, fillings, and more.<br><strong>For Adults:</strong> There is also dental coverage for adults, which includes exams, cleanings, and certain restorative services.'
    },
    working: {
      keywords: ['working', 'job', 'employment', 'lose medicaid'],
      response: 'Not necessarily. If your income increases, you may still qualify under a different category or for low-cost coverage through the Maryland Health Connection.'
    },
    replacement_card: {
      keywords: ['new card', 'replacement card', 'lost card', 'stolen card'],
      response: 'If your red and white Medicaid card is lost or stolen, call 1-855-642-8572 to request a replacement.'
    },
    mental_health: {
      keywords: ['mental health', 'therapy', 'counseling', 'psychiatric'],
      response: 'Yes. Medicaid covers mental health services, including therapy, psychiatric care, and medication management.'
    },
    in_person_help: {
      keywords: ['in person', 'navigator', 'help applying', 'assistance'],
      response: 'Yes. I can help you schedule an appointment with a local navigator or caseworker for in-person enrollment assistance.',
      actions: [
        { id: 'schedule_help', label: 'Schedule In-Person Help', type: 'escalate' as const, data: { reason: 'in_person_help' } }
      ]
    }
  };

  private knowledgeBase = {
    en: {
      benefits: {
        response: 'Your Medicaid benefits include:<br>• Medical services (doctor visits, hospital care)<br>• Prescription drugs<br>• Preventive care (screenings, vaccines)<br>• Mental health services<br>• Emergency services<br><br>Would you like details about any specific benefit?',
        actions: [
          { id: 'medical', label: 'Medical Services', type: 'action' as const, data: { topic: 'medical' } },
          { id: 'prescriptions', label: 'Prescription Coverage', type: 'action' as const, data: { topic: 'prescriptions' } },
          { id: 'preventive', label: 'Preventive Care', type: 'action' as const, data: { topic: 'preventive' } }
        ]
      },
      providers: {
        response: 'I can help you find healthcare providers in your area. What type of provider are you looking for?',
        actions: [
          { id: 'primary', label: 'Primary Care Doctor', type: 'action' as const, data: { providerType: 'primary' } },
          { id: 'specialist', label: 'Specialist', type: 'action' as const, data: { providerType: 'specialist' } },
          { id: 'pharmacy', label: 'Pharmacy', type: 'action' as const, data: { providerType: 'pharmacy' } },
          { id: 'urgent', label: 'Urgent Care', type: 'action' as const, data: { providerType: 'urgent' } }
        ]
      },
      mco: {
        response: 'I can help you compare Managed Care Organizations (MCOs). Here are the main factors to consider:<br>• Provider networks<br>• Available benefits<br>• Prescription coverage<br>• Customer service ratings<br><br>Would you like to see available MCOs in your area?',
        actions: [
          { id: 'compare', label: 'Compare MCOs', type: 'action' as const, data: { topic: 'comparison' } },
          { id: 'network', label: 'Check Provider Networks', type: 'action' as const, data: { topic: 'network' } },
          { id: 'benefits_compare', label: 'Compare Benefits', type: 'action' as const, data: { topic: 'benefits_compare' } }
        ]
      },
      escalation: {
        response: 'I understand you need additional assistance. Let me connect you with a human agent who can provide specialized help.',
        showEscalation: true
      }
    },
    es: {
      benefits: {
        response: 'Sus beneficios de Medicaid incluyen:<br>• Servicios médicos (visitas al médico, atención hospitalaria)<br>• Medicamentos recetados<br>• Atención preventiva (exámenes, vacunas)<br>• Servicios de salud mental<br>• Servicios de emergencia<br><br>¿Le gustaría obtener detalles sobre algún beneficio específico?',
        actions: [
          { id: 'medical', label: 'Servicios Médicos', type: 'action' as const, data: { topic: 'medical' } },
          { id: 'prescriptions', label: 'Cobertura de Recetas', type: 'action' as const, data: { topic: 'prescriptions' } },
          { id: 'preventive', label: 'Atención Preventiva', type: 'action' as const, data: { topic: 'preventive' } }
        ]
      },
      providers: {
        response: 'Puedo ayudarte a encontrar proveedores de atención médica en tu área. ¿Qué tipo de proveedor estás buscando?',
        actions: [
          { id: 'primary', label: 'Médico de Atención Primaria', type: 'action' as const, data: { providerType: 'primary' } },
          { id: 'specialist', label: 'Especialista', type: 'action' as const, data: { providerType: 'specialist' } },
          { id: 'pharmacy', label: 'Farmacia', type: 'action' as const, data: { providerType: 'pharmacy' } },
          { id: 'urgent', label: 'Atención Urgente', type: 'action' as const, data: { providerType: 'urgent' } }
        ]
      },
      mco: {
        response: 'Puedo ayudarte a comparar Organizaciones de Atención Administrada (MCOs). Estos son los principales factores a considerar:<br>• Redes de proveedores<br>• Beneficios disponibles<br>• Cobertura de medicamentos recetados<br>• Calificaciones de servicio al cliente<br><br>¿Te gustaría ver las MCOs disponibles en tu área?',
        actions: [
          { id: 'compare', label: 'Comparar MCOs', type: 'action' as const, data: { topic: 'comparison' } },
          { id: 'network', label: 'Verificar Redes de Proveedores', type: 'action' as const, data: { topic: 'network' } },
          { id: 'benefits_compare', label: 'Comparar Beneficios', type: 'action' as const, data: { topic: 'benefits_compare' } }
        ]
      },
      escalation: {
        response: 'Entiendo que necesitas asistencia adicional. Permíteme conectarte con un agente humano que puede brindar ayuda especializada.',
        showEscalation: true
      }
    },
    fr: {
      benefits: {
        response: 'Vos avantages Medicaid incluent:<br>• Services médicaux (visites chez le médecin, soins hospitaliers)<br>• Médicaments sur ordonnance<br>• Soins préventifs (dépistages, vaccins)<br>• Services de santé mentale<br>• Services d\'urgence<br><br>Souhaitez-vous des détails sur un avantage spécifique?',
        actions: [
          { id: 'medical', label: 'Services Médicaux', type: 'action' as const, data: { topic: 'medical' } },
          { id: 'prescriptions', label: 'Couverture des Ordonnances', type: 'action' as const, data: { topic: 'prescriptions' } },
          { id: 'preventive', label: 'Soins Préventifs', type: 'action' as const, data: { topic: 'preventive' } }
        ]
      },
      providers: {
        response: 'Je peux vous aider à trouver des fournisseurs de soins de santé dans votre région. Quel type de fournisseur recherchez-vous?',
        actions: [
          { id: 'primary', label: 'Médecin de Soins Primaires', type: 'action' as const, data: { providerType: 'primary' } },
          { id: 'specialist', label: 'Spécialiste', type: 'action' as const, data: { providerType: 'specialist' } },
          { id: 'pharmacy', label: 'Pharmacie', type: 'action' as const, data: { providerType: 'pharmacy' } },
          { id: 'urgent', label: 'Soins Urgents', type: 'action' as const, data: { providerType: 'urgent' } }
        ]
      },
      mco: {
        response: 'Je peux vous aider à comparer les Organisations de Soins Gérés (MCOs). Voici les principaux facteurs à considérer:<br>• Réseaux de fournisseurs<br>• Avantages disponibles<br>• Couverture des médicaments sur ordonnance<br>• Évaluations du service client<br><br>Souhaitez-vous voir les MCOs disponibles dans votre région?',
        actions: [
          { id: 'compare', label: 'Comparer les MCOs', type: 'action' as const, data: { topic: 'comparison' } },
          { id: 'network', label: 'Vérifier les Réseaux de Fournisseurs', type: 'action' as const, data: { topic: 'network' } },
          { id: 'benefits_compare', label: 'Comparer les Avantages', type: 'action' as const, data: { topic: 'benefits_compare' } }
        ]
      },
      escalation: {
        response: 'Je comprends que vous avez besoin d\'une assistance supplémentaire. Permettez-moi de vous connecter avec un agent humain qui peut fournir une aide spécialisée.',
        showEscalation: true
      }
    }
  };

  addUserMessage(text: string) {
    const message: ChatMessage = {
      id: this.generateId(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    this.addMessage(message);
  }

  addBotMessage(text: string, tags?: string[], actions?: ChatAction[], showEscalation = false) {
    const message: ChatMessage = {
      id: this.generateId(),
      text,
      isUser: false,
      timestamp: new Date(),
      actions,
      showEscalation,
      tags
    };
    this.addMessage(message);
  }

  processMessage(message: string, language: string = 'en') {
    const lowerMessage = message.toLowerCase();
    const kb = this.knowledgeBase[language as keyof typeof this.knowledgeBase] || this.knowledgeBase.en;

    // SAMPLE: Check knowledge base - Replace with your AI service call
    const matchedQA = this.findSampleMatch(lowerMessage);
    if (matchedQA) {
      this.addBotMessage(matchedQA.response, ['sample_data'], matchedQA.actions || []);
      return;
    }

    // Intent recognition (simplified)
    if (this.matchesIntent(lowerMessage, ['benefits', 'benefit', 'coverage', 'covered', 'include'])) {
      this.addBotMessage(kb.benefits.response, ['benefits'], kb.benefits.actions);
    }
    else if (this.matchesIntent(lowerMessage, ['doctor', 'provider', 'find', 'near', 'physician', 'hospital'])) {
      this.addBotMessage(kb.providers.response, ['providers'], kb.providers.actions);
    }
    else if (this.matchesIntent(lowerMessage, ['mco', 'plan', 'compare', 'choose', 'select', 'organization'])) {
      this.addBotMessage(kb.mco.response, ['mco'], kb.mco.actions);
    }
    else if (this.matchesIntent(lowerMessage, ['help', 'human', 'agent', 'person', 'representative'])) {
      this.addBotMessage(kb.escalation.response, ['escalation'], [], true);
    }
    else if (this.matchesIntent(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon'])) {
      const greetings = {
        en: 'Hello! How can I help you with your Medicaid benefits today?',
        es: '¡Hola! ¿Cómo puedo ayudarte con tus beneficios de Medicaid hoy?',
        fr: 'Bonjour! Comment puis-je vous aider avec vos avantages Medicaid aujourd\'hui?'
      };
      this.addBotMessage(greetings[language as keyof typeof greetings] || greetings.en);
    }
    else {
      // Default response with escalation option
      const defaultResponses = {
        en: 'I\'m not sure I understand that question. Let me help you with some common topics, or I can connect you with a human agent for more specific assistance.',
        es: 'No estoy seguro de entender esa pregunta. Permíteme ayudarte con algunos temas comunes, o puedo conectarte con un agente humano para asistencia más específica.',
        fr: 'Je ne suis pas sûr de comprendre cette question. Permettez-moi de vous aider avec quelques sujets communs, ou je peux vous connecter avec un agent humain pour une assistance plus spécifique.'
      };

      const commonActions = [
        { id: 'benefits_help', label: language === 'es' ? 'Ver Beneficios' : language === 'fr' ? 'Voir les Avantages' : 'View Benefits', type: 'action' as const, data: { topic: 'benefits' } },
        { id: 'provider_help', label: language === 'es' ? 'Encontrar Proveedor' : language === 'fr' ? 'Trouver un Fournisseur' : 'Find Provider', type: 'action' as const, data: { topic: 'providers' } },
        { id: 'escalate_help', label: language === 'es' ? 'Hablar con Agente' : language === 'fr' ? 'Parler à un Agent' : 'Speak to Agent', type: 'escalate' as const, data: { reason: 'unknown_intent' } }
      ];

      this.addBotMessage(
        defaultResponses[language as keyof typeof defaultResponses] || defaultResponses.en,
        ['help'],
        commonActions
      );
    }
  }

  handleAction(action: ChatAction, language: string = 'en') {
    const kb = this.knowledgeBase[language as keyof typeof this.knowledgeBase] || this.knowledgeBase.en;

    switch (action.type) {
      case 'action':
        this.handleActionByData(action.data, language);
        break;
      case 'escalate':
        this.addBotMessage(kb.escalation.response, ['escalation'], [], true);
        break;
      case 'link':
        // Handle external links
        window.open(action.data?.url, '_blank');
        break;
    }
  }

  private handleActionByData(data: any, language: string) {
    // SAMPLE: Check if it's a sample topic - Replace with your AI logic
    const sampleResponse = this.sampleKnowledgeBase[data.topic as keyof typeof this.sampleKnowledgeBase];
    if (sampleResponse) {
      this.addBotMessage(sampleResponse.response, ['sample_data'], sampleResponse.actions || []);
      return;
    }

    const responses = {
      en: {
        medical: 'Medical services include:<br>• Primary care visits<br>• Specialist consultations<br>• Hospital stays<br>• Laboratory tests<br>• X-rays and imaging<br>• Surgical procedures<br><br>All medically necessary services are covered with no copay.',
        prescriptions: 'Prescription drug coverage includes:<br>• Generic medications (preferred)<br>• Brand-name drugs when medically necessary<br>• Specialty medications<br>• Over-the-counter drugs with prescription<br><br>Most prescriptions are available at $0-$3 copay.',
        preventive: 'Preventive care services include:<br>• Annual physical exams<br>• Immunizations<br>• Cancer screenings<br>• Well-child visits<br>• Health education<br><br>All preventive services are covered at 100% with no copay.',
        primary: 'Here are primary care providers near Phoenix, AZ:<br><br><strong>Dr. Sarah Johnson, MD</strong><br>Family Medicine<br>1234 Main St, Phoenix, AZ<br>Phone: (602) 555-0123<br>Accepting new patients<br><br><strong>Phoenix Community Health Center</strong><br>Internal Medicine<br>5678 Central Ave, Phoenix, AZ<br>Phone: (602) 555-0456<br>Sliding scale fees available',
        specialist: 'What type of specialist are you looking for? Common specialists include:<br>• Cardiologist (heart)<br>• Dermatologist (skin)<br>• Endocrinologist (diabetes/hormones)<br>• Orthopedist (bones/joints)<br>• Psychiatrist (mental health)<br><br>Please let me know the specialty you need.',
        pharmacy: 'Participating pharmacies near you:<br><br><strong>CVS Pharmacy</strong><br>Multiple locations<br>24-hour locations available<br><br><strong>Walgreens</strong><br>Multiple locations<br>Drive-thru available<br><br><strong>Walmart Pharmacy</strong><br>Lower cost options<br>$4 generic program<br><br>All accept Medicaid with your member ID card.',
        comparison: 'Available MCOs in Arizona:<br><br><strong>Arizona Complete Health</strong><br>• Large provider network<br>• Strong preventive care focus<br>• 4.2/5 member satisfaction<br><br><strong>Banner University Family Care</strong><br>• Academic medical center affiliation<br>• Specialized care options<br>• 4.1/5 member satisfaction<br><br><strong>Mercy Care</strong><br>• Community-focused<br>• Behavioral health integration<br>• 4.0/5 member satisfaction'
      },
      es: {
        medical: 'Los servicios médicos incluyen:<br>• Visitas de atención primaria<br>• Consultas con especialistas<br>• Estancias hospitalarias<br>• Pruebas de laboratorio<br>• Radiografías e imágenes<br>• Procedimientos quirúrgicos<br><br>Todos los servicios médicamente necesarios están cubiertos sin copago.',
        prescriptions: 'La cobertura de medicamentos recetados incluye:<br>• Medicamentos genéricos (preferidos)<br>• Medicamentos de marca cuando sean médicamente necesarios<br>• Medicamentos especializados<br>• Medicamentos de venta libre con receta<br><br>La mayoría de las recetas están disponibles con un copago de $0-$3.',
        preventive: 'Los servicios de atención preventiva incluyen:<br>• Exámenes físicos anuales<br>• Inmunizaciones<br>• Detección de cáncer<br>• Visitas de niño sano<br>• Educación sobre la salud<br><br>Todos los servicios preventivos están cubiertos al 100% sin copago.'
      },
      fr: {
        medical: 'Les services médicaux incluent:<br>• Visites de soins primaires<br>• Consultations spécialisées<br>• Séjours à l\'hôpital<br>• Tests de laboratoire<br>• Radiographies et imagerie<br>• Procédures chirurgicales<br><br>Tous les services médicalement nécessaires sont couverts sans quote-part.',
        prescriptions: 'La couverture des médicaments sur ordonnance comprend:<br>• Médicaments génériques (préférés)<br>• Médicaments de marque lorsque médicalement nécessaire<br>• Médicaments spécialisés<br>• Médicaments en vente libre avec ordonnance<br><br>La plupart des ordonnances sont disponibles avec une quote-part de 0 à 3 $.',
        preventive: 'Les services de soins préventifs incluent:<br>• Examens physiques annuels<br>• Immunisations<br>• Dépistages du cancer<br>• Visites d\'enfant en bonne santé<br>• Éducation à la santé<br><br>Tous les services préventifs sont couverts à 100% sans quote-part.'
      }
    };

    const langResponses = responses[language as keyof typeof responses] || responses.en;
    const response = langResponses[data.topic as keyof typeof langResponses] ||
                    langResponses[data.providerType as keyof typeof langResponses];

    if (response) {
      this.addBotMessage(response, [data.topic || data.providerType]);
    } else {
      this.processMessage(`Tell me about ${data.topic || data.providerType}`, language);
    }
  }

  // SAMPLE METHOD - Replace with your AI service integration
  private findSampleMatch(message: string): SampleQA | null {
    for (const [key, qa] of Object.entries(this.sampleKnowledgeBase)) {
      if (qa.keywords && this.matchesIntent(message, qa.keywords)) {
        return qa;
      }
    }
    return null;
  }

  private matchesIntent(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword));
  }

  clearMessages() {
    this.messagesSubject.next([]);
  }

  private addMessage(message: ChatMessage) {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
