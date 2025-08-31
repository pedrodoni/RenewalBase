"use client";

import { useState, useCallback, useMemo } from 'react';
import { Trophy, Zap, ShoppingCart, TrendingUp, Users, Award, Battery, Wind, Sun, ArrowRight, Shield, Database, Globe, Leaf, BarChart3, AlertTriangle, User, LogIn, LogOut, X, Calculator } from 'lucide-react';

// Componente LoginModal separado - CLAVE para evitar re-renders
const LoginModal = ({ isOpen, onClose, loginForm, onFormChange, onSubmit }: any) => {
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={loginForm.email}
              onChange={(e) => onFormChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="tu@email.com"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="login-password"
              type="password"
              value={loginForm.password}
              onChange={(e) => onFormChange('password', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta? <span className="text-green-600 cursor-pointer hover:underline">Regístrate</span>
        </p>
      </div>
    </div>
  );
};

// Componente OptimizationModal separado
const OptimizationModal = ({ isOpen, onClose, optimizationForm, onFormChange, onSubmit, savings }: {
  isOpen: boolean;
  onClose: () => void;
  optimizationForm: any;
  onFormChange: (e: any) => void;
  onSubmit: () => void;
  savings: any;
}) => {
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-green-600" />
            Calculadora de Optimización
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="kwh-consumption" className="block text-sm font-medium text-gray-700 mb-2">
                Consumo kWh/mes
              </label>
              <input
                id="kwh-consumption"
                type="number"
                step="0.01"
                min="0"
                value={optimizationForm.kwhConsumption}
               onChange={(e) => onFormChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="300"
                required
              />
            </div>
            <div>
              <label htmlFor="price-per-kwh" className="block text-sm font-medium text-gray-700 mb-2">
                Precio $/kWh
              </label>
              <input
                id="price-per-kwh"
                type="number"
                step="0.001"
                min="0"
                value={optimizationForm.pricePerKwh}
onChange={(e) => onFormChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="0.15"
                required
              />
            </div>
            <div>
              <label htmlFor="hours-per-day" className="block text-sm font-medium text-gray-700 mb-2">
                Horas/día
              </label>
              <input
                id="hours-per-day"
                type="number"
                min="1"
                max="24"
                value={optimizationForm.hoursPerDay}
onChange={(e) => onFormChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>

          {savings && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">📊 Proyección de Ahorros</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consumo mensual:</span>
                    <span className="font-semibold">{savings.monthlyConsumption} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consumo diario:</span>
                    <span className="font-semibold">{savings.dailyConsumption} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Costo mensual actual:</span>
                    <span className="font-semibold">${savings.monthlyCost}</span>
                  </div>
                  <div className="flex justify-between text-green-700">
                    <span className="font-medium">Ahorro mensual (25%):</span>
                    <span className="font-bold">${savings.monthlySavings}</span>
                  </div>
                  <div className="flex justify-between text-green-800">
                    <span className="font-medium">Ahorro anual:</span>
                    <span className="font-bold text-lg">${savings.yearlySavings}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tokens EGB/día:</span>
                    <span className="font-semibold text-green-600">+{savings.tokensGenerated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CO₂ evitado/día:</span>
                    <span className="font-semibold text-green-600">{savings.co2Saved} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Equivalente árboles/año:</span>
                    <span className="font-semibold text-green-600">{Math.floor(parseFloat(savings.co2Saved) * 365 / 22)} árboles</span>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 text-center">
                      💡 La optimización se basa en IA y patrones de consumo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!savings}
            >
              <span>Comenzar Optimización IA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function RenewalBase() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAlert, setShowAlert] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOptimizationModal, setShowOptimizationModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [optimizationForm, setOptimizationForm] = useState({
    kwhConsumption: '',
    pricePerKwh: '',
    hoursPerDay: '24'
  });

  // Datos estáticos - useMemo para evitar re-creaciones
  const rankingData = useMemo(() => [
    { id: 1, address: "0x7a2f...8d4c", optimization: 94.8, tokens: 12840, efficiency: "Excelente", tier: "Diamante" },
    { id: 2, address: "0x3b1e...5f9a", optimization: 91.2, tokens: 11620, efficiency: "Muy Alto", tier: "Platino" },
    { id: 3, address: "0x9c5d...2a7b", optimization: 88.7, tokens: 10950, efficiency: "Alto", tier: "Oro" },
    { id: 4, address: "0x6f2a...4e8d", optimization: 85.3, tokens: 9870, efficiency: "Alto", tier: "Oro" },
    { id: 5, address: "0x8d3c...7b1f", optimization: 82.1, tokens: 8640, efficiency: "Bueno", tier: "Plata" },
    { id: 6, address: "0x4a9e...3c6d", optimization: 78.9, tokens: 7520, efficiency: "Bueno", tier: "Plata" },
    { id: 7, address: "0x1f7b...9e4a", optimization: 75.4, tokens: 6180, efficiency: "Moderado", tier: "Bronce" },
    { id: 8, address: "0x5e8c...2d7f", optimization: 72.6, tokens: 5340, efficiency: "Moderado", tier: "Bronce" }
  ], []);

  const products = useMemo(() => [
    {
      id: 1,
      name: "Panel Solar Monocristalino 400W",
      price: 890,
      specs: "400W | 21% eficiencia | 25 años",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&h=300&fit=crop&auto=format&q=80",
      tokensPerHour: 2.5
    },
    {
      id: 2,
      name: "Turbina Eólica Vertical 1000W",
      price: 2450,
      specs: "1000W | 3-25 m/s | 20 años",
      image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=500&h=300&fit=crop&auto=format&q=80",
      tokensPerHour: 4.2
    },
    {
      id: 3,
      name: "Batería LiFePO4 5kWh",
      price: 1680,
      specs: "5000Wh | 6000 ciclos | 10 años",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop&auto=format&q=80",
      tokensPerHour: 1.8
    },
    {
      id: 4,
      name: "Inversor Híbrido 3000W",
      price: 750,
      specs: "3000W | MPPT | WiFi",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop&auto=format&q=80",
      tokensPerHour: 1.2
    }
  ], []);

  // Handlers de formularios - ESTABLES
  const handleLoginFormChange = useCallback((field, value) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleOptimizationFormChange = useCallback((field, value) => {
    setOptimizationForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      const newUser = {
        name: loginForm.email.split('@')[0],
        email: loginForm.email,
        address: "0x" + Math.random().toString(16).substring(2, 10) + "..." + Math.random().toString(16).substring(2, 6),
        tokens: Math.floor(Math.random() * 10000) + 5000
      };
      setUser(newUser);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
      setShowAlert('Login exitoso');
      setTimeout(() => setShowAlert(''), 3000);
    }
  }, [loginForm.email, loginForm.password]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    setShowAlert('Sesión cerrada');
    setTimeout(() => setShowAlert(''), 3000);
  }, []);

  // Cálculo de ahorros estable
  const calculateSavings = useMemo(() => {
    const kwhMonthly = parseFloat(optimizationForm.kwhConsumption) || 0;
    const price = parseFloat(optimizationForm.pricePerKwh) || 0;
    const hours = parseFloat(optimizationForm.hoursPerDay) || 24;
    
    if (kwhMonthly <= 0 || price <= 0 || hours <= 0) return null;
    
    const dailyConsumption = kwhMonthly / 30;
    const monthlyCost = kwhMonthly * price;
    const dailyCost = monthlyCost / 30;
    const optimizationPercent = 0.25;
    const dailySavings = dailyCost * optimizationPercent;
    const monthlySavings = monthlyCost * optimizationPercent;
    const yearlySavings = monthlySavings * 12;
    const tokensGenerated = dailyConsumption * optimizationPercent * 0.1;
    
    return {
      monthlyConsumption: kwhMonthly.toFixed(2),
      dailyConsumption: dailyConsumption.toFixed(2),
      monthlyCost: monthlyCost.toFixed(2),
      dailyCost: dailyCost.toFixed(2),
      dailySavings: dailySavings.toFixed(2),
      monthlySavings: monthlySavings.toFixed(2),
      yearlySavings: yearlySavings.toFixed(2),
      tokensGenerated: tokensGenerated.toFixed(2),
      co2Saved: (dailyConsumption * optimizationPercent * 0.4).toFixed(2)
    };
  }, [optimizationForm.kwhConsumption, optimizationForm.pricePerKwh, optimizationForm.hoursPerDay]);

  const handleOptimizationSubmit = useCallback((e) => {
    e.preventDefault();
    if (calculateSavings) {
      setShowAlert(`Optimización iniciada! Ahorrarás $${calculateSavings.dailySavings} diarios`);
      setShowOptimizationModal(false);
      setOptimizationForm({ kwhConsumption: '', pricePerKwh: '', hoursPerDay: '24' });
      setTimeout(() => {
        setActiveTab('store');
        setShowAlert('');
      }, 3000);
    }
  }, [calculateSavings]);

  const handleButtonClick = useCallback((action) => {
    if (action === 'Iniciar Optimización') {
      if (!isLoggedIn) {
        setShowLoginModal(true);
        return;
      }
      setShowOptimizationModal(true);
      return;
    }
    
    setShowAlert(`Funcionalidad "${action}" será implementada próximamente`);
    setTimeout(() => setShowAlert(''), 3000);
  }, [isLoggedIn]);

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Datos Mundiales de Energía */}
      <div className="bg-gradient-to-r from-blue-900 to-green-900 text-white p-8 rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Estado Global de la Energía 2024</h3>
          <p className="text-blue-200">Datos en tiempo real del consumo energético mundial</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <Globe className="w-8 h-8 mx-auto mb-2 text-blue-300" />
            <div className="text-3xl font-bold">40.9%</div>
            <div className="text-sm text-blue-200">Energía Baja en Carbono</div>
            <div className="text-xs text-green-300 mt-1">↑12pp desde 2010</div>
          </div>
          <div className="text-center">
            <Wind className="w-8 h-8 mx-auto mb-2 text-green-300" />
            <div className="text-3xl font-bold">858 TWh</div>
            <div className="text-sm text-blue-200">Renovables Agregadas</div>
            <div className="text-xs text-green-300 mt-1">Récord mundial 2024</div>
          </div>
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
            <div className="text-3xl font-bold">445 g</div>
            <div className="text-sm text-blue-200">CO₂/kWh Global</div>
            <div className="text-xs text-red-300 mt-1">↓3.6% anual previsto</div>
          </div>
          <div className="text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-300" />
            <div className="text-3xl font-bold">+2.2%</div>
            <div className="text-sm text-blue-200">Crecimiento Energético</div>
            <div className="text-xs text-yellow-300 mt-1">Vs +1.5% histórico</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-black/20 rounded-lg">
          <p className="text-sm text-center text-blue-200">
            Las fuentes renovables agregaron un récord de 858 TWh en 2024, alcanzando el 32% del mix energético global, mientras el consumo mundial creció 2.2%
          </p>
        </div>
      </div>

      {/* Stats principales */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tokens Generados Hoy</p>
              <p className="text-2xl font-bold text-green-600">+847 EGB</p>
            </div>
            <Zap className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Eficiencia Actual</p>
              <p className="text-2xl font-bold text-blue-600">92.4%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Energía Optimizada</p>
              <p className="text-2xl font-bold text-purple-600">2,847 kWh</p>
            </div>
            <Battery className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Balance Total</p>
              <p className="text-2xl font-bold text-orange-600">{isLoggedIn && user ? user.tokens.toLocaleString() : '18,429'} EGB</p>
            </div>
            <Database className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Panel de generación de tokens */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border relative overflow-hidden">
        <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span>IA Activa</span>
        </div>
        
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">🧠 Generación IA de Tokens en Tiempo Real</h3>
          <p className="text-gray-600">Nuestra Inteligencia Artificial optimiza automáticamente tu consumo energético para maximizar ganancias</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border relative">
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Sun className="w-5 h-5 text-yellow-500 mr-2" />
              Optimización Solar IA
            </h4>
            <div className="text-3xl font-bold text-green-600 mb-2">+2.5 EGB/h</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full transition-all duration-1000" style={{width: '85%'}}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">85% eficiencia IA activa</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border relative">
            <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Battery className="w-5 h-5 text-blue-500 mr-2" />
              Red de Almacenamiento IA
            </h4>
            <div className="text-3xl font-bold text-blue-600 mb-2">+1.8 EGB/h</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" style={{width: '72%'}}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">72% capacidad optimizada por IA</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border relative">
            <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Zap className="w-5 h-5 text-purple-500 mr-2" />
              Eficiencia Global IA
            </h4>
            <div className="text-3xl font-bold text-purple-600 mb-2">+3.2 EGB/h</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full transition-all duration-1000" style={{width: '94%'}}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">94% optimización total IA</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => handleButtonClick('Maximizar Generación')}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <Zap className="w-5 h-5" />
            <span>Maximizar Generación IA</span>
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </button>
          <p className="text-xs text-gray-500 mt-2">🤖 Algoritmos de Deep Learning optimizando continuamente</p>
        </div>
      </div>

      {/* Impacto Ambiental */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Leaf className="w-5 h-5 text-green-600 mr-2" />
            Tu Impacto Ambiental
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">CO₂ Evitado:</span>
              <span className="font-semibold text-green-600">1,247 kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Equivalente árboles:</span>
              <span className="font-semibold text-green-600">56 árboles</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ahorro energético:</span>
              <span className="font-semibold text-blue-600">2,847 kWh</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            Red Base Network
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Transacciones:</span>
              <span className="font-semibold">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gas promedio:</span>
              <span className="font-semibold text-blue-600">0.0001 ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tiempo bloque:</span>
              <span className="font-semibold">2 seg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRanking = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Ranking Blockchain</h2>
        <p className="text-gray-600">Usuarios anónimos registrados en Base Network</p>
      </div>
      
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="grid grid-cols-5 gap-4 text-sm font-semibold text-gray-700">
            <div>Posición</div>
            <div>Dirección</div>
            <div>Optimización</div>
            <div>Tokens EGB</div>
            <div>Tier</div>
          </div>
        </div>
        
        {rankingData.map((userData, index) => (
          <div key={userData.id} className="px-6 py-4 border-b last:border-b-0 hover:bg-gray-50">
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold
                  ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-gray-300'}`}>
                  {index + 1}
                </div>
              </div>
              <div className="font-mono text-sm text-gray-600">{userData.address}</div>
              <div className="font-semibold text-green-600">{userData.optimization}%</div>
              <div className="font-semibold">{userData.tokens.toLocaleString()}</div>
              <div>
                <span className={`px-2 py-1 rounded text-xs font-medium
                  ${userData.tier === 'Diamante' ? 'bg-purple-100 text-purple-700' :
                    userData.tier === 'Platino' ? 'bg-gray-100 text-gray-700' :
                    userData.tier === 'Oro' ? 'bg-yellow-100 text-yellow-700' :
                    userData.tier === 'Plata' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'}`}>
                  {userData.tier}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStore = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Equipos Certificados</h2>
        <p className="text-gray-600">Genera tokens automáticamente con cada compra</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/500x300/10b981/ffffff?text=${encodeURIComponent(product.name)}`;
              }}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.specs}</p>
              
              <div className="flex items-center justify-between mb-4 p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Genera tokens por hora</p>
                  <p className="text-lg font-bold text-green-600">+{product.tokensPerHour} EGB/h</p>
                </div>
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-800">${product.price.toLocaleString()}</div>
                <button 
                  onClick={() => handleButtonClick(`Comprar ${product.name}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Comprar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modals - SEPARADOS del componente principal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        loginForm={loginForm}
        onFormChange={handleLoginFormChange}
        onSubmit={handleLogin}
      />
      
      <OptimizationModal 
        isOpen={showOptimizationModal}
        onClose={() => setShowOptimizationModal(false)}
        optimizationForm={optimizationForm}
        onFormChange={handleOptimizationFormChange}
        onSubmit={handleOptimizationSubmit}
        savings={calculateSavings}
      />
      
      {/* Alert */}
      {showAlert && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          {showAlert}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 via-blue-600 to-teal-600 rounded-lg flex items-center justify-center relative">
                <div className="absolute inset-1 bg-white rounded-md"></div>
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <div className="w-3 h-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-full"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Renewal Base</h1>
                <p className="text-xs text-gray-500">Powered by Base Network</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'dashboard' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Panel
                </button>
                <button
                  onClick={() => setActiveTab('ranking')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'ranking' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Ranking
                </button>
                <button
                  onClick={() => setActiveTab('store')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'store' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Tienda
                </button>
              </nav>
              
              {/* User Section */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-600">{user?.tokens.toLocaleString()} EGB</p>
                  </div>
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-800 p-2"
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Iniciar Sesión</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero compacto */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-green-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-500/20 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-teal-500/20 rounded-full blur-xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">🤖 Optimiza con IA. Gana. Contribuye.</h2>
          <p className="text-xl mb-6">Inteligencia Artificial genera Tokens EnergyBase por cada kWh optimizado en Base Network</p>
          <div className="flex justify-center items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold">2.4M+</div>
              <div className="text-sm opacity-90">kWh Optimizados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">45.2M</div>
              <div className="text-sm opacity-90">Tokens Distribuidos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm opacity-90">Usuarios Activos</div>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => handleButtonClick('Iniciar Optimización')}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Iniciar Optimización IA</span>
            </button>
            <button 
              onClick={() => handleButtonClick('Ver Documentación')}
              className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Documentación Técnica
            </button>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'ranking' && renderRanking()}
        {activeTab === 'store' && renderStore()}
      </main>

      {/* Footer minimalista */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Renewal Base - Construido en Base Network</p>
        </div>
      </footer>
    </div>
  );
}