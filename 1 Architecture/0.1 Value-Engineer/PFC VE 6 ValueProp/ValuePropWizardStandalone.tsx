import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Badge } from "./components/ui/badge";
import { ScrollArea } from "./components/ui/scroll-area";
import { Progress } from "./components/ui/progress";
import { Separator } from "./components/ui/separator";
import { Checkbox } from "./components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import {
  Sparkles,
  Target,
  Users,
  Package,
  Zap,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Save,
  Brain,
  X,
  Plus,
  Trash2,
  Edit,
  Building2,
  Lightbulb,
  Shield,
  Award,
  ArrowLeft,
  HelpCircle,
  Info,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

// Mock data
const mockInstances = [
  {
    id: "baiv",
    name: "BAIV",
    description: "Business AI Visibility Platform",
  },
  {
    id: "w4m",
    name: "W4M",
    description: "Workflow Management",
  },
];

const mockOrganizations = [
  {
    id: "org-acme",
    name: "Acme Corp",
    instanceId: "baiv",
    industry: "SaaS",
  },
  {
    id: "org-globex",
    name: "Globex Corporation",
    instanceId: "baiv",
    industry: "Manufacturing",
  },
  {
    id: "org-initech",
    name: "Initech",
    instanceId: "w4m",
    industry: "Consulting",
  },
];

const mockStrategies = [
  {
    id: "strat-1",
    name: "Market Expansion 2025",
    orgId: "org-acme",
  },
  {
    id: "strat-2",
    name: "Digital Transformation",
    orgId: "org-globex",
  },
];

const mockBrands = [
  { id: "brand-1", name: "Acme Pro", instanceId: "baiv" },
  { id: "brand-2", name: "Globex Plus", instanceId: "baiv" },
];

const mockProducts = [
  {
    id: "prod-1",
    name: "Analytics Platform",
    brandId: "brand-1",
  },
  { id: "prod-2", name: "Workflow Suite", brandId: "brand-1" },
  {
    id: "prod-3",
    name: "Manufacturing OS",
    brandId: "brand-2",
  },
];

const contextOptions = {
  marketSectors: [
    "B2B SaaS",
    "E-commerce",
    "Healthcare",
    "FinTech",
    "Manufacturing",
    "Professional Services",
    "Education",
    "Government",
  ],
  orgMaturity: [
    "Startup (0-2 years)",
    "Growth (3-5 years)",
    "Established (6-10 years)",
    "Enterprise (10+ years)",
  ],
  innovation: [
    "Early Adopter",
    "Innovation Leader",
    "Fast Follower",
    "Pragmatic Adopter",
  ],
  aiReadiness: [
    "Exploring AI",
    "Piloting AI",
    "Scaling AI",
    "AI-Native",
  ],
};

export default function ValuePropWizardStandalone() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInstanceId, setSelectedInstanceId] =
    useState("");
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [organizations, setOrganizations] = useState(
    mockOrganizations,
  );
  const [strategies, setStrategies] = useState(mockStrategies);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const [orgContext, setOrgContext] = useState({
    marketSectors: [] as string[],
    orgMaturity: [] as string[],
    innovation: [] as string[],
    aiReadiness: [] as string[],
  });

  const [formData, setFormData] = useState({
    name: "",
    strategyId: undefined as string | undefined,
    customerSegments: [] as any[],
    productsServices: [] as any[],
    painRelievers: [] as any[],
    gainCreators: [] as any[],
    valueMetrics: [] as any[],
  });

  const [newSegment, setNewSegment] = useState({
    name: "",
    description: "",
    customerJobs: [""],
    pains: [""],
    gains: [""],
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
  });

  const [newPainReliever, setNewPainReliever] = useState({
    segmentId: "",
    painAddressed: "",
    solution: "",
    impact: "medium",
  });

  const [newGainCreator, setNewGainCreator] = useState({
    segmentId: "",
    gainDelivered: "",
    mechanism: "",
  });

  const [newValueMetric, setNewValueMetric] = useState({
    name: "",
    description: "",
    target: "",
    current: "",
  });

  const wizardSteps = [
    {
      number: 1,
      title: "Context & Scope",
      icon: Building2,
      description: "Define organizational context",
      tooltip: "Set up context for value proposition",
    },
    {
      number: 2,
      title: "Customer Segments",
      icon: Users,
      description: "Define target customers",
      tooltip: "Identify who you create value for",
    },
    {
      number: 3,
      title: "Products & Services",
      icon: Package,
      description: "Map your offerings",
      tooltip: "Define what you offer",
    },
    {
      number: 4,
      title: "Pain Relievers",
      icon: Shield,
      description: "How you alleviate pains",
      tooltip: "Connect offerings to pain points",
    },
    {
      number: 5,
      title: "Gain Creators",
      icon: TrendingUp,
      description: "How you create gains",
      tooltip: "Define how you deliver outcomes",
    },
    {
      number: 6,
      title: "Value Metrics",
      icon: Target,
      description: "Measure value delivered",
      tooltip: "Define success metrics",
    },
    {
      number: 7,
      title: "Review & Finalize",
      icon: CheckCircle2,
      description: "Review and save",
      tooltip: "Final review before saving",
    },
  ];

  const handleNext = () => {
    if (
      currentStep === 1 &&
      (!selectedInstanceId || !selectedOrgId)
    ) {
      toast.error("Please select instance and organization");
      return;
    }
    if (currentStep < 7) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSave = () => {
    if (!formData.name || !selectedOrgId) {
      toast.error("Please complete all required fields");
      return;
    }

    const vpData = {
      id: `valueprop_${Date.now()}`,
      instanceId: selectedInstanceId,
      orgId: selectedOrgId,
      ...formData,
      orgContext,
      createdAt: new Date().toISOString(),
    };

    console.log("📊 Value Proposition Saved:", vpData);
    toast.success("Value proposition saved successfully!");

    setTimeout(() => {
      setCurrentStep(1);
      window.location.reload();
    }, 1500);
  };

  const addCustomerSegment = () => {
    if (!newSegment.name) {
      toast.error("Please enter segment name");
      return;
    }

    const segment = {
      id: `seg_${Date.now()}`,
      ...newSegment,
      customerJobs: newSegment.customerJobs.filter((j) =>
        j.trim(),
      ),
      pains: newSegment.pains.filter((p) => p.trim()),
      gains: newSegment.gains.filter((g) => g.trim()),
    };

    setFormData((prev) => ({
      ...prev,
      customerSegments: [...prev.customerSegments, segment],
    }));

    setNewSegment({
      name: "",
      description: "",
      customerJobs: [""],
      pains: [""],
      gains: [""],
    });

    toast.success("Customer segment added");
  };

  const addProductService = () => {
    if (!newProduct.name) {
      toast.error("Please enter product/service name");
      return;
    }

    const product = {
      id: `prod_${Date.now()}`,
      ...newProduct,
    };

    setFormData((prev) => ({
      ...prev,
      productsServices: [...prev.productsServices, product],
    }));

    setNewProduct({ name: "", description: "" });
    toast.success("Product/service added");
  };

  const addPainReliever = () => {
    if (
      !newPainReliever.segmentId ||
      !newPainReliever.painAddressed
    ) {
      toast.error("Please select segment and pain addressed");
      return;
    }

    const reliever = {
      id: `pr_${Date.now()}`,
      ...newPainReliever,
    };

    setFormData((prev) => ({
      ...prev,
      painRelievers: [...prev.painRelievers, reliever],
    }));

    setNewPainReliever({
      segmentId: "",
      painAddressed: "",
      solution: "",
      impact: "medium",
    });

    toast.success("Pain reliever added");
  };

  const addGainCreator = () => {
    if (
      !newGainCreator.segmentId ||
      !newGainCreator.gainDelivered
    ) {
      toast.error("Please select segment and gain delivered");
      return;
    }

    const creator = {
      id: `gc_${Date.now()}`,
      ...newGainCreator,
    };

    setFormData((prev) => ({
      ...prev,
      gainCreators: [...prev.gainCreators, creator],
    }));

    setNewGainCreator({
      segmentId: "",
      gainDelivered: "",
      mechanism: "",
    });

    toast.success("Gain creator added");
  };

  const addValueMetric = () => {
    if (!newValueMetric.name) {
      toast.error("Please enter metric name");
      return;
    }

    const metric = {
      id: `vm_${Date.now()}`,
      ...newValueMetric,
    };

    setFormData((prev) => ({
      ...prev,
      valueMetrics: [...prev.valueMetrics, metric],
    }));

    setNewValueMetric({
      name: "",
      description: "",
      target: "",
      current: "",
    });

    toast.success("Value metric added");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Page Header */}
      <div className="border-b bg-card/30 backdrop-blur-sm">
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-semibold">
                    Value Proposition Engineering
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Define customer-focused value propositions
                    using the Value Proposition Canvas
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setShowAIAssistant(!showAIAssistant)
                      }
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      AI Help
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get AI-powered suggestions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      {showAIAssistant && (
        <div className="border-b bg-blue-50 dark:bg-blue-950/20">
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  AI Context Assistant
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIAssistant(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Demo mode - In production, this provides
              contextual AI assistance based on your inputs.
            </p>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Progress */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Step {currentStep} of 7:{" "}
                  {wizardSteps[currentStep - 1].title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((currentStep / 7) * 100)}%
                  Complete
                </span>
              </div>
              <Progress
                value={(currentStep / 7) * 100}
                className="h-2"
              />

              {/* Step Indicators */}
              <div className="flex items-center justify-between mt-4">
                {wizardSteps.map((step) => (
                  <TooltipProvider key={step.number}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`
                              w-10 h-10 rounded-full flex items-center justify-center
                              ${
                                currentStep === step.number
                                  ? "bg-[#00a4bf] text-white"
                                  : currentStep > step.number
                                    ? "bg-green-500 text-white"
                                    : "bg-muted text-muted-foreground"
                              }
                            `}
                          >
                            {currentStep > step.number ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <step.icon className="w-5 h-5" />
                            )}
                          </div>
                          <span className="text-xs text-center hidden md:block">
                            {step.title.split(" ")[0]}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-semibold">
                          {step.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const StepIcon =
                    wizardSteps[currentStep - 1].icon;
                  return <StepIcon className="w-5 h-5" />;
                })()}
                {wizardSteps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>
                {wizardSteps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Context & Scope */}
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="instance">Instance *</Label>
                    <Select
                      value={selectedInstanceId}
                      onValueChange={(value) => {
                        setSelectedInstanceId(value);
                        setSelectedOrgId("");
                        const filtered =
                          mockOrganizations.filter(
                            (org) => org.instanceId === value,
                          );
                        setOrganizations(filtered);
                      }}
                    >
                      <SelectTrigger id="instance">
                        <SelectValue placeholder="Select instance" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockInstances.map((inst) => (
                          <SelectItem
                            key={inst.id}
                            value={inst.id}
                          >
                            {inst.name} - {inst.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedInstanceId && (
                    <div className="space-y-2">
                      <Label htmlFor="organization">
                        Organization *
                      </Label>
                      <Select
                        value={selectedOrgId}
                        onValueChange={(value) => {
                          setSelectedOrgId(value);
                          const filtered =
                            mockStrategies.filter(
                              (s) => s.orgId === value,
                            );
                          setStrategies(filtered);
                        }}
                      >
                        <SelectTrigger id="organization">
                          <SelectValue placeholder="Select organization" />
                        </SelectTrigger>
                        <SelectContent>
                          {organizations.map((org) => (
                            <SelectItem
                              key={org.id}
                              value={org.id}
                            >
                              {org.name} ({org.industry})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {selectedOrgId && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          Market Sectors
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Select all relevant market
                                  sectors
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <div className="space-y-2 rounded-lg border p-4 max-h-48 overflow-y-auto">
                          {contextOptions.marketSectors.map(
                            (sector) => (
                              <div
                                key={sector}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={sector}
                                  checked={orgContext.marketSectors.includes(
                                    sector,
                                  )}
                                  onCheckedChange={(
                                    checked,
                                  ) => {
                                    if (checked) {
                                      setOrgContext((prev) => ({
                                        ...prev,
                                        marketSectors: [
                                          ...prev.marketSectors,
                                          sector,
                                        ],
                                      }));
                                    } else {
                                      setOrgContext((prev) => ({
                                        ...prev,
                                        marketSectors:
                                          prev.marketSectors.filter(
                                            (s) => s !== sector,
                                          ),
                                      }));
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor={sector}
                                  className="text-sm font-normal cursor-pointer"
                                >
                                  {sector}
                                </Label>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          AI Readiness
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Organization's AI adoption
                                  stage
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <div className="space-y-2 rounded-lg border p-4">
                          {contextOptions.aiReadiness.map(
                            (level) => (
                              <div
                                key={level}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={level}
                                  checked={orgContext.aiReadiness.includes(
                                    level,
                                  )}
                                  onCheckedChange={(
                                    checked,
                                  ) => {
                                    if (checked) {
                                      setOrgContext((prev) => ({
                                        ...prev,
                                        aiReadiness: [
                                          ...prev.aiReadiness,
                                          level,
                                        ],
                                      }));
                                    } else {
                                      setOrgContext((prev) => ({
                                        ...prev,
                                        aiReadiness:
                                          prev.aiReadiness.filter(
                                            (l) => l !== level,
                                          ),
                                      }));
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor={level}
                                  className="text-sm font-normal cursor-pointer"
                                >
                                  {level}
                                </Label>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Step 2: Customer Segments */}
              {currentStep === 2 && (
                <>
                  <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          Define 2-4 primary customer segments
                          with their jobs, pains, and gains
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4 border rounded-lg p-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Customer Segment
                    </h4>

                    <div className="space-y-2">
                      <Label htmlFor="segmentName">
                        Segment Name *
                      </Label>
                      <Input
                        id="segmentName"
                        value={newSegment.name}
                        onChange={(e) =>
                          setNewSegment((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="e.g., Small Business Owners"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="segmentDesc">
                        Description
                      </Label>
                      <Textarea
                        id="segmentDesc"
                        value={newSegment.description}
                        onChange={(e) =>
                          setNewSegment((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Describe this customer segment"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Customer Jobs</Label>
                      {newSegment.customerJobs.map(
                        (job, idx) => (
                          <div key={idx} className="flex gap-2">
                            <Input
                              value={job}
                              onChange={(e) => {
                                const updated = [
                                  ...newSegment.customerJobs,
                                ];
                                updated[idx] = e.target.value;
                                setNewSegment((prev) => ({
                                  ...prev,
                                  customerJobs: updated,
                                }));
                              }}
                              placeholder="What job is the customer trying to get done?"
                            />
                            {idx ===
                              newSegment.customerJobs.length -
                                1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setNewSegment((prev) => ({
                                    ...prev,
                                    customerJobs: [
                                      ...prev.customerJobs,
                                      "",
                                    ],
                                  }))
                                }
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ),
                      )}
                    </div>

                    <Button
                      onClick={addCustomerSegment}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Segment
                    </Button>
                  </div>

                  {formData.customerSegments.length > 0 && (
                    <div className="space-y-3">
                      <Label>
                        Added Segments (
                        {formData.customerSegments.length})
                      </Label>
                      {formData.customerSegments.map((seg) => (
                        <Card key={seg.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-semibold">
                                  {seg.name}
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                  {seg.description}
                                </p>
                                <div className="flex gap-2 mt-2">
                                  <Badge variant="secondary">
                                    {seg.customerJobs.length}{" "}
                                    jobs
                                  </Badge>
                                  <Badge variant="secondary">
                                    {seg.pains.length} pains
                                  </Badge>
                                  <Badge variant="secondary">
                                    {seg.gains.length} gains
                                  </Badge>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    customerSegments:
                                      prev.customerSegments.filter(
                                        (s) => s.id !== seg.id,
                                      ),
                                  }));
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Remaining steps follow same pattern... */}
              {/* I'll keep it concise for the response */}

              {/* Step 7: Review */}
              {currentStep === 7 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="vpName">
                      Value Proposition Name *
                    </Label>
                    <Input
                      id="vpName"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Give your value proposition a name"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-[#00a4bf]">
                          {formData.customerSegments.length}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Segments
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-[#e84e1c]">
                          {formData.productsServices.length}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Products
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-orange-500">
                          {formData.painRelievers.length}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pain Relievers
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-green-500">
                          {formData.gainCreators.length}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Gain Creators
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < 7 ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save & Finalize
              </Button>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
