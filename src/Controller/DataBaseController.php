<?php

namespace App\Controller;

use App\Entity\DataBase;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

#[Route('/api')]
class DataBaseController extends AbstractController
{
    #[Route('/Db', name: 'app_data_base_index', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $em=$doctrine->getManager();
        $dbs=$em
            ->getRepository(DataBase::class)
            ->findAll();
        $data = [];
        foreach ($dbs as $db){
            $data[]=[
                'id'=> $db->getId(),
                'HostUrl'=> $db->getHostUrl(),
                'dbName'=>$db->getDbName() ,
                'login'=> $db->getLogin() ,
                'pw'=> $db->getPassword() ,

            ];
        }
        return $this->json($data);
    }


    #[Route('/Db', name: 'app_data_base_new', methods: ['GET', 'POST'])]
    public function new(ManagerRegistry $doctrine,Request $request): Response
    {
        $em=$doctrine->getManager();
$Db=new DataBase();

             $Db->setDbName($request->request->get('dbName'));
             $Db->setLogin($request->request->get('login'));
             $Db->setPassword($request->request->get('pw'));
             $Db->setHostUrl($request->request->get('HostUrl'));
             $em->persist($Db);
             $em->flush();
        return $this->json('Created new access successfully with id ' . $Db->getId());


    }

    #[Route('/Db/{id}', name: 'app_data_base_show', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine,$id): Response
    {
        $Db=$doctrine
            ->getRepository(DataBase::class)
            ->find($id);
        if (!$Db){
            return $this->json('no access found for id',$id,404);
        }
        $data=[
            'id'=>$Db->getId(),
            'dbName'=>$Db->getDbName(),
            'login'=>$Db->getLogin(),
            'pw'=>$Db->getPassword(),
            'HostUrl'=>$Db->getHostUrl(),
        ];
        return $this->json($data);
    }

    #[Route('/Db/{id}', name: 'app_data_base_edit', methods: ['PATCH'])]
    public function edit(ManagerRegistry $doctrine,$id,Request $request): Response
    {
        $em=$doctrine->getManager();
        $Db=$em ->getRepository(DataBase::class)
            ->find($id);
        if(!$Db){
            return json("no access parameters found with such an id",$id,404);
        }
        $content= json_decode($request->getContent());
        $Db->setDbName($content->dbName);
        $Db->setLogin($content->login);
        $Db->setPassword($content->pw);
        $Db->setHostUrl($content->HostUrl);

        $em->flush();

        $data=[
            'id'=>$Db->getId(),
            'dbName'=>$Db->getDbName(),
            'login'=>$Db->getLogin(),
            'pw'=>$Db->getPassword(),
            'hostUrl'=>$Db->getHostUrl(),

        ];
        return $this->json($data);
    }

    #[Route('/Db/{id}', name: 'app_data_base_delete', methods: ['DELETE'])]
    public function delete( ManagerRegistry $doctrine,$id): Response
    {
        $entityManager = $doctrine->getManager();
        $Db = $entityManager->getRepository(DataBase::class)->find($id);

        if (!$Db) {
            return $this->json('No access to database found for id' . $id, 404);
        }

        $entityManager->remove($Db);
        $entityManager->flush();

        return $this->json('Deleted  client access parameter successfully with id ' . $id);
    }
}
