<?php

namespace App\Controller;

use App\Entity\Ftp;
use Doctrine\Persistence\ManagerRegistry;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class FtpController extends AbstractController
{
    #[Route('/ftp', name: 'app_ftp_index', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $em=$doctrine->getManager();
        $ftps=$em->getRepository(Ftp::class)->findAll();
        $data=[];
        foreach ($ftps as $ftp)
        {
            $data[]=
                [
                    'id'=> $ftp->getId(),
                    'hostUrl'=>$ftp->getHostUrl(),
                    'login'=>$ftp->getLogin(),
                    'password'=>$ftp->getPassword()
                ];

         }
        return $this->json($data);
    }

    #[Route('/ftp', name: 'app_ftp_new', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine,Request $request): Response
    {
$em=$doctrine->getManager();
$ftp=new Ftp();
        $ftp->setHostUrl($request->request->get('HostUrl'));
        $ftp->setLogin($request->request->get('login'));
        $ftp->setPassword($request->request->get('pw'));
        $em->persist($ftp);
        $em->flush();
        return $this->json('Created new access successfully with id ' . $ftp->getId());
    }

    #[Route('/ftp/{id}', name: 'app_ftp_show', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine,$id): Response
    {
        $ftp=$doctrine
            ->getRepository(Ftp::class)
            ->find($id);
        if (!$ftp){
            return $this->json('no access found for id',$id,404);
        }
        $data=[
            'id'=>$ftp->getId(),
            'login'=>$ftp->getLogin(),
            'password'=>$ftp->getPassword(),
            'HostUrl'=>$ftp->getHostUrl(),
        ];
        return $this->json($data);
    }

    #[Route('/ftp/{id}', name: 'app_ftp_edit', methods: ['PATCH'])]
    public function edit(ManagerRegistry $doctrine,Request $request, $id): Response
    {
$em=$doctrine->getManager();
$ftp=$em->getRepository(Ftp::class)->find($id);
        if(!$ftp){
            return json("no access parameters found with such an id",$id,404);
        }
        $content= json_decode($request->getContent());
        $ftp->setLogin($content->login);
        $ftp->setPassword($content->pw);
        $ftp->setHostUrl($content->HostUrl);

        $em->flush();

        $data=[
            'id'=>$ftp->getId(),
            'login'=>$ftp->getLogin(),
            'pw'=>$ftp->getPassword(),
            'hostUrl'=>$ftp->getHostUrl(),

        ];
        return $this->json($data);
    }

    #[Route('/ftp/{id}', name: 'app_ftp_delete', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine ,$id): Response
    {
        $entityManager = $doctrine->getManager();
        $ftp = $entityManager->getRepository(Ftp::class)->find($id);

        if (!$ftp) {
            return $this->json('No access to database found for id' . $id, 404);
        }

        $entityManager->remove($ftp);
        $entityManager->flush();

        return $this->json('Deleted  FTP access parameter successfully with id ' . $id);

    }
}
