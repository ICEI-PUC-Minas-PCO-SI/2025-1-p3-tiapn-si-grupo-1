import React, { useRef, useEffect } from 'react';
import { PlansConteiner, NossosPlanos, ThreeColumnContainerPlan, CardPlans, CardBlueBox, HorizontalLine3 } from './styles'
import { Check } from 'lucide-react';

const Plans = () => {
    const horizontalLineRef = useRef(null);  
    
    useEffect(() => {
     const handleScroll = () => {
       const scrollTop = window.scrollY;
       const triggerPoint = 200;
       const progress = Math.min((scrollTop - triggerPoint) / 2200, 1);
    
       if (horizontalLineRef.current) {
         horizontalLineRef.current.style.transform = `scaleX(${progress})`;
       }
     };
    
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
  return (
    <PlansConteiner>
        <NossosPlanos>Nossos <strong>Planos</strong></NossosPlanos>
        <ThreeColumnContainerPlan>
            <CardPlans>
                <CardBlueBox>
                    <h2>Plano Premium</h2>
                </CardBlueBox>
                <h3>R$ 64/mês <span>por equipe</span></h3>
                <ul>
                    <li><Check color='#233DFF'/><span className='item-text'>Até 10 usuários</span></li>
                    <li><Check color='#233DFF'/><span className='item-text'>R$ 12,00 / Adicional de usuário</span></li>
                    <li><Check color='#233DFF'/><span className='item-text'>Tutoriais, feed corporativo, integração com Google Drive, permissões básicas</span></li>
                </ul>
            </CardPlans>
            <CardPlans>
                <CardBlueBox>
                    <h2>Plano Pro</h2>
                </CardBlueBox>    
                <h3>R$ 129/mês <span>por equipe</span></h3>
                <ul>
                    <li><Check color='#233DFF'/><span className='item-text'>Até 50 usuários</span></li>
                    <li><Check color='#233DFF'/><span className='item-text'>R$ 10,00 / Adicional de usuário</span></li>
                    <li><Check color='#233DFF'/><span className='item-text'>Inclui tudo do Premium + validação por cargo, gamificação, pastas privadas, analytics simples, múltiplos setores</span></li>
                </ul>            
            </CardPlans>
            <CardPlans>
                <CardBlueBox>
                    <h2>Plano Enterprise</h2>
                </CardBlueBox>
                <h3>Sob Consulta</h3>
                <ul>
                    <li><Check color='#233DFF'/><span className='item-text'>Ilimitado + Customização</span></li>
                    <li><Check color='#233DFF'/><span className='item-text'>--</span></li>
                    <li><Check color='#233DFF'/><span className='item-text'>Inclui tudo do Pro + SSO, integração com SharePoint, branding, relatórios avançados, suporte e implantação dedicada</span></li>
                </ul>
            </CardPlans>
        </ThreeColumnContainerPlan>
        <HorizontalLine3 ref={horizontalLineRef}/>
        
    </PlansConteiner>
  )
}

export default Plans