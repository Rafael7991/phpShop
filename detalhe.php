<?php require_once("../conexao/conexaoshop.php"); ?>
<?php
    session_start();
?>
<?php
    setlocale(LC_ALL, 'pt_BR');

    $produtos = "SELECT produtoID, nomeproduto, modelo, precovenda, imagem ";
    $produtos .= " FROM produtos ";
    if(isset($_GET['produto'])){
        $nome_produto = $_GET['produto'];
        $produtos .= "WHERE nomeproduto LIKE '%{$nome_produto}%'";
    }
    $resultado = mysqli_query($conecta, $produtos);
    if(!$resultado) {
        die("Falha na consulta ao banco");   
    }
?>
<?php
    if(isset($_POST['usuario'])){
        $usuario = $_POST['usuario'];
        $senha = $_POST['senha'];

        $login = "SELECT * ";
        $login .=" FROM clientes ";
        $login .=" WHERE usuario = '{$usuario}' and senha ='{$senha}' ";

        $acesso = mysqli_query($conecta,$login);
        if(!$acesso){
            die('falha no acesso ao banco');
        }

        $info = mysqli_fetch_assoc($acesso);

        if(empty($info)){
            $msg='Usuário ou senha incorretos';
        } else {
            $_SESSION['user_portal'] = $info['clienteID'];
            header("location:home.php");
        }
    }
?>
<?php
    if ( isset($_GET["codigo"]) ) {
        $produto_id = $_GET["codigo"];
    } else {
        Header("Location: inicial.php");
    }

    // Consulta ao banco de dados
    $consulta = "SELECT * ";
    $consulta .= "FROM produtos ";
    $consulta .= "WHERE produtoID = {$produto_id} ";
    $detalhe    = mysqli_query($conecta,$consulta);

    // Testar erro
    if ( !$detalhe ) {
        die("Falha no Banco de dados");
    } else {
        $dados_detalhe = mysqli_fetch_assoc($detalhe);
        $produtoID      = $dados_detalhe["produtoID"];
        $nomeproduto    = $dados_detalhe["nomeproduto"];
        $precovenda   = $dados_detalhe["precovenda"];
        $imagemgrande   = $dados_detalhe["imagemg"];
        $modelo = $dados_detalhe['modelo'];
        $fab_ID = $dados_detalhe['fabricanteID'];
        $descricao = $dados_detalhe['descricao'];
    }
?>
<?php
    $marca1 = "SELECT nome FROM fab ";
    $marca1 .=" WHERE fabricanteID = {$fab_ID}";
    $marca2 = mysqli_query($conecta, $marca1);
    $marca = mysqli_fetch_assoc($marca2);
?>
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Curso PHP Integração com MySQL</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <link rel='stylesheet' href='css/css1.css'>
    </head>
    <body>
        <?php include_once("funcoes.php"); ?>
        <div class='container'>
            <nav class='navbar'>
                <ul class="nav justify-content-center">
                    <li style='margin-top:5px' class="nav-item"><a class="nav-link" href='home.php'>Home</a></li>
                    <li style='margin-top:5px' class="nav-item"><a class="nav-link" href='produtos.php'>Produtos</a></li>
                    
                    <li class="nav-item">
                        <?php
                        if(isset($_SESSION['user_portal'])){
                        $user = $_SESSION['user_portal'];

                        $saudacao = "SELECT nome ";
                        $saudacao .= "FROM clientes ";
                        $saudacao .= "WHERE clienteID = $user ";

                        $saudacao_login = mysqli_query($conecta,$saudacao);
                        if(!$saudacao_login){
                            die("falha no banco");
                        } 
                        $saudacao_login = mysqli_fetch_assoc($saudacao_login);
                        $nome = $saudacao_login['nome'];
                        ?>
                        <div style='margin-top:3px' id='header_saudacao'><h6>Bem-vindo(a), <?php echo $nome ?> - <a href='sair.php'>Sair</a></h6> </div>
                        <li style='margin-left: 50px; margin-top:3px'class="nav-item"><a href='cadastro2.php' class="nav-link" href='/'>Cadastre sua empresa</a></li>
                        <?php
                        } else {
                        ?>
                            <li style='margin-top:5px' class="nav-item"><a href='inserir.php' class="nav-link" href='/'>Cadastre-se</a></li>
                            <form action='home.php' method='post' class="form-inline">
                                <div class="input-group">
                                    <input name='usuario' type="text" class="form-control" placeholder="Usuário">
                                    <input name='senha' type="password" class="form-control" placeholder="Senha">
                                    <input class="btn btn-sm btn-outline-secondary" type="submit" value='Login'>
                                </div> 
                            </form>
                        <?php
                        }
                        ?>
                    </li>
                </ul>
                
                <form action='search.php' method='GET'>
                    <div class="input-group">
                        <input  class="bsc form-control" type="search" name='produto' placeholder="Busca">
                        <input  class="btn btn-sm btn-outline-secondary" type="submit">
                    </div>
                </form>
            </nav>

            <header >
                <img style='margin-left: 15px; margin-top: 20px;' src="../../img/logo3.png">
                <p>Sempre com você!</p>
            </header>
        </div>
        <main>  
            <div style='width:1110px;' class="container detalhe_produto">
                <ul>
                    <li style='margin-top:15px;' class="imagem"><img src="<?php echo $imagemgrande ?>"></li>
                    <li><h3><?php echo $nomeproduto ?></h2></li>
                    <li><h2><?php echo $marca['nome'] ?></h3></li>
                    <li><h3><?php echo $modelo ?>
                    <br></br>
                    <li><h6><?php echo $descricao ?></h6></li>
                    <li><b></b><?php echo real_format($precovenda) ?></li>
                </ul>
                <a style='height:50px; margin-top:15px;' class='btn btn-success btn-block' href='const.php'>Buy now!</a>
            </div>
        </main>
        <?php include_once("rodape.html"); ?>
    </body>
</html>

<?php
    // Fechar conexao
    mysqli_close($conecta);
?>