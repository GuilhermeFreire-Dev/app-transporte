import Image from "next/image";
import SideBar from "@/app/components/sidebar";
import { BLOCKED_PAGES } from "next/dist/shared/lib/constants";

export default function Home() {
  return (
    <div className="main-content">
      <h1 style={{ fontSize: '50px', textAlign: 'center',  display: 'flex', justifyContent: 'center'}}>
        Atividade de POO com Banco de Dados
      </h1>
      <br /><br />

     <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}}>
  <div style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backgroundColor: '#fff',
    width: '300px',
  }}>
    <h2 style={{
      margin: '0 0 10px 0', // Adds space below the header
      fontSize: '24px', // Optional font size adjustment
      color:"black"
    }}>Alunos:</h2>
    <ul style={{
      listStyleType: 'none',
      padding: '0',
      margin: '0', // Removes default margin
      color:"black"
    }}>
      <li style={{ fontSize: '18px' }}>Gustavo Cardoso Santana</li>
      <li style={{ fontSize: '18px' }}>Guilherme Freire</li>
      <li style={{ fontSize: '18px' }}>Sergio Almeida</li>
      <li style={{ fontSize: '18px' }}>Gabriel Teodoro</li>
    </ul>
  </div>
</div>


    </div>
  );
}
