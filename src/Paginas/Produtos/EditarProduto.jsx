import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../../Componentes/http";
const EditarProduto = () => {
 
    const {id} = useParams();
    const [nome, setNome] = useState('');
    const [codigo, setCodigo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    // const [categoriaId, setCategoriaId] = useState(0);
    // const [categorias, setCategorias] = useState([]);
    // const [arquivo, setArquivo] = useState('');
 
    useEffect(() => {
        http.get('produto/' + nome)
          .then(response => {
            setNome(response.data.nome);
            setCodigo(response.data.codigo);
            setDescricao(response.data.descricao);
            setPreco(response.data.preco);
            setQuantidade(response.data.quantidade);
            
          })
      }, [nome])
    
    const salvarAlteracoes = (evento) => {
        evento.preventDefault()
        const produto = {
            nome: nome,
            codigo: codigo,
            descricao: descricao,
            preco: preco,
            quantidadeEstoque: quantidade,
            id:id
            // categoria: {
            //     id: categoriaId
            // },
            // imgBase64: arquivo
        }
        http.put('produto/' + id, produto)
          .then(resposta => {
            console.log(resposta.data)
          })
          .catch(erro => {
            console.log('Algo deu errado')
            console.log(erro)
          })
      }
 
    return (
    <form onSubmit={salvarAlteracoes} className="row g-3 formulario-produto-categoria">
    <div className="col-md-6">
        <label className="form-label">Nome</label>
        <input value={nome} onChange={(evento) => setNome(evento.target.value)} className="form-control" />
    </div>
    <div className="col-md-6">
        <label className="form-label">Código</label>
        <input value={codigo} onChange={(evento) => setCodigo(evento.target.value)} className="form-control" />
    </div>
    <div className="col-12">
        <label className="form-label">Descrição</label>
        <input value={descricao} onChange={(evento) => setDescricao(evento.target.value)} className="form-control" />
    </div>
    <div className="col-md-4">
        <label className="form-label">Preço</label>
        <input value={preco} onChange={(evento) => setPreco(evento.target.value)} type="number" className="form-control" />
    </div>
    <div className="col-md-4">
        <label className="form-label">Quantidade</label>
        <input value={quantidade} onChange={(evento) => setQuantidade(evento.target.value)} type="text" className="form-control" />
    </div>
    {/* <div className="col-md-4">
        <label  className="form-label">Categoria</label>
        <select value={categoriaId} onChange={(evento) => setCategoriaId(evento.target.value)} className="form-select">
        {categorias.map(categoria => <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>)}
        </select>
    </div>
    <div className="col-md-12">
        <label className="form-label">Imagem</label>
        <input onChange={manipuladorArquivo} type="file" className="form-control" id="formFile" />
    </div> */}
    <div className="col-12 botao-cadastrar-novo">
        <button type="submit" className="btn btn-primary botao-cadastro">Salvar Alterações</button>
    </div>
</form>
 )
}

export default EditarProduto;