<?php
    if(!isset($_GET['produto'])){
        header('Location: home.php');
        exit;
    }

    $nome = '%'.trim($_GET['produto']).'%';
    $dbh = new PDO('mysql:host=127.0.0.1;dbname=andes', 'root', '');

    $sth = $dbh->prepare('SELECT * FROM `produtos` WHERE `nomeproduto` LIKE :nome');
    $sth->bindParam(':nome', $nome, PDO::PARAM_STR);
    $sth->execute();

    $resultados = $sth->fetchAll(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Resultado da busca</title>
    </head>
    <body>
        <?php include_once("topo.php"); ?>
        <h2>Resultado da busca</h2>
        <?php
            if (count($resultados)) {
                foreach($resultados as $Resultado) {
        ?>
        <label><?php echo $Resultado['produtoID']; ?> - <?php echo $Resultado['nomeproduto']; ?></label>
        <br>
        <?php
        } } else {
        ?>
        <label>Não foram encontrados resultados pelo termo buscado.</label>
        <?php
        }
        ?>
    </body>
</html>