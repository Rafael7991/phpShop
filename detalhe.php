<?php require_once("../conexao/conexao.php"); ?>
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
        $descricao      = $dados_detalhe["descricao"];
        $codigobarra    = $dados_detalhe["codigobarra"];
        $tempoentrega   = $dados_detalhe["tempoentrega"];
        $precorevenda   = $dados_detalhe["precorevenda"];
        $precounitario  = $dados_detalhe["precounitario"];
        $estoque        = $dados_detalhe["estoque"];
        $imagemgrande   = $dados_detalhe["imagemgrande"];
    }
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
        <?php include_once("topo.php"); ?>
        <main>  
            <div class="container detalhe_produto">
                <ul>
                    <li class="imagem"><img src="<?php echo $imagemgrande ?>"></li>
                    <li><h2><?php echo $nomeproduto ?></h2></li>
                    <li><b>Descrição: </b><?php echo $descricao ?></li>
                    <li><b>Código de Barra: </b><?php echo $codigobarra ?></li>
                    <li><b>Tempo de Entrega: </b><?php echo $tempoentrega . " dias" ?></li>
                    <li><b>Preço Revenda: </b><?php echo real_format($precorevenda) ?></li>
                    <li><b>Preço Unitário: </b><?php echo real_format($precounitario) ?></li>
                    <li><b>Estoque: </b><?php echo $estoque ?></li>
                </ul>
                <a href='home.php'><div class='btn btn-success btn-block'>Buy now!</div></a>
            </div>
        </main>
    </body>
</html>

<?php
    // Fechar conexao
    mysqli_close($conecta);
?>