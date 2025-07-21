
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { User } from './type';

const App: React.FC = () => {
  /**
   * <>
   * {}
   * =>
   * ()
   */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User &{token: string } | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const userConnected = localStorage.getItem('userConnected');
    if (userConnected) {
      const parsedUser: User &{token: string } = JSON.parse(userConnected);
      setUser(parsedUser);
    }
  }, []);

  return (
      <div className="min-h-screen bg-white font-sans">
        {/* Header */}
        <header className="bg-white shadow-sm fixed w-full z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-600">
                  <i className="fas fa-file-invoice mr-2"></i>
                  FacturePro
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#fonctionnalites" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">Fonctionnalités</a>
                <a href="#prix" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">Prix</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">Contact</a>
                
                { user ? (
                    <button 
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                      onClick={() => navigate('/dashboard')}
                    >
                      Tableau de bord
                    </button>
                  ) : 
                  (
                    <button 
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                      onClick={() => navigate('/login')}
                    >
                    Connexion
                  </button>
                  ) 
                }
              </nav>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                >
                  <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}>test</i>
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#fonctionnalites" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">Fonctionnalités</a>
                <a href="#prix" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">Prix</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">Contact</a>
                <button className="w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                  Connexion
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('assets/img/invoicegenerator.jpg')`
            }}
          >

          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
            <div className="grid md:grid-cols-2 gap-8 items-center min-h-[600px]">
              <div className="text-left pt-8 md:pt-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Simplifiez votre facturation
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Générez des factures professionnelles en quelques clics et gagnez du temps au quotidien.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-orange-600 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    { user ? "Commencer" : "Essayer gratuitement" }
                  </button>
                  <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-50 transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fonctionnalites" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Fonctionnalités principales</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Notre solution vous offre tous les outils nécessaires pour gérer efficacement votre facturation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <i className="fas fa-file-invoice text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Création rapide de factures</h3>
                <p className="text-gray-600 text-center">
                  Créez des factures professionnelles en quelques secondes grâce à nos modèles personnalisables.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <i className="fas fa-chart-line text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Mise a jours automatique du cours de change </h3>
                <p className="text-gray-600 text-center">
                  Suivez en temps réel le statut de vos factures et recevez des alertes pour les paiements en retard.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <i className="fas fa-users text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Gestion des clients</h3>
                <p className="text-gray-600 text-center">
                  Centralisez les informations de vos clients et accédez à leur historique de facturation en un clic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* App Demo Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Une interface intuitive pour une facturation sans effort</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Sélectionnez un modèle</h3>
                      <p className="text-gray-600">Choisissez parmi notre bibliothèque de modèles professionnels adaptés à votre secteur d'activité.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Personnalisez votre facture</h3>
                      <p className="text-gray-600">Ajoutez votre logo, vos coordonnées et personnalisez les couleurs pour refléter l'identité de votre entreprise.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Envoyez et suivez</h3>
                      <p className="text-gray-600">Envoyez vos factures par email directement depuis l'application et suivez leur statut en temps réel.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  {/* <img 
                    src="https://readdy.ai/api/search-image?query=Professional%20invoice%20application%20dashboard%20interface%20with%20clean%20modern%20design%2C%20showing%20invoice%20creation%20screen%20with%20form%20fields%2C%20payment%20tracking%20charts%2C%20and%20client%20management%20panel%2C%20blue%20and%20white%20color%20scheme%2C%20high%20quality%20digital%20mockup%20on%20laptop%20screen&width=600&height=500&seq=2&orientation=portrait" 
                    alt="Interface de l'application FacturePro" 
                    className="w-full h-auto object-cover object-top"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Prêt à simplifier votre facturation ?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Rejoignez des milliers d'entreprises qui font confiance à FacturePro pour leur gestion de facturation quotidienne.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                // onClick={() => navigate('/billing')}
                className="bg-orange-500 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-orange-600 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Commencer maintenant
              </button>
              <p className="text-gray-600 flex items-center justify-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Essai gratuit de 14 jours
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-700 text-sm">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p>© 2025 Masovia Madagascar. Tous droits réservés.</p>
                
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}

export default App;
